require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const TtsService = require('./services/tts');

const app = express();
const PORT = process.env.PORT || 3000;

// Database setup
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'cantonese.db');
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Seed demo users if not exists
function seedDemoUsers() {
  const existing = db.prepare('SELECT COUNT(*) as count FROM users').get();
  if (existing.count === 0) {
    const hash = bcrypt.hashSync('demo123', 10);
    const insertUser = db.prepare(
      'INSERT INTO users (id, username, password, nickname, level, score, base_cantonese, learning_goal, position, company, avatar_color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    insertUser.run(1, 'demo', hash, '阿明', 2, 150, 'basic', '下个月外派香港', 'FICO顾问', '越秀集团', '#FF6B35');
    insertUser.run(2, 'ahua', hash, '阿花', 2, 120, 'basic', '对接香港客户', '项目经理', '腾讯', '#4ECDC4');
    insertUser.run(3, 'aqiang', hash, '阿强', 3, 280, 'intermediate', '在香港office工作', 'IT顾问', '中银香港', '#45B7D1');
    insertUser.run(4, 'aling', hash, '阿玲', 1, 80, 'none', '想学粤语方便工作', '财务分析师', '平安集团', '#96CEB4');
    insertUser.run(5, 'awing', hash, '阿荣', 4, 450, 'fluent', '提升商务粤语', '高级顾问', '德勤', '#FFEAA7');
    console.log('Demo users seeded.');
  }
}
seedDemoUsers();

// Migrations
try {
  const cols = db.prepare("PRAGMA table_info(challenges)").all().map(c => c.name);
  if (!cols.includes('challenge_mode')) {
    db.exec("ALTER TABLE challenges ADD COLUMN challenge_mode TEXT DEFAULT 'quiz'");
    console.log('Migration: added challenge_mode column to challenges');
  }
} catch (e) { /* column may already exist */ }

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'cantonese-app-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true
  }
}));

// Auth middleware
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: '请先登录' });
  }
  next();
}

// ==================== AUTH ROUTES ====================
app.post('/api/register', (req, res) => {
  try {
    const { username, password, nickname, baseCantonese, learningGoal, position, company } = req.body;
    
    if (!username || !password || !nickname) {
      return res.status(400).json({ error: '用户名、密码和昵称为必填项' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ error: '密码至少6位' });
    }

    const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
    if (existing) {
      return res.status(400).json({ error: '用户名已存在' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const colors = ['#FF6B35', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98FB98', '#FFB6C1'];
    const avatarColor = colors[Math.floor(Math.random() * colors.length)];

    const result = db.prepare(
      'INSERT INTO users (username, password, nickname, avatar_color, base_cantonese, learning_goal, position, company) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(username, hashedPassword, nickname, avatarColor, baseCantonese || 'none', learningGoal || '', position || '', company || '');

    req.session.userId = result.lastInsertRowid;
    res.json({ success: true, userId: result.lastInsertRowid });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: '注册失败' });
  }
});

app.post('/api/login', (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (!user) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }

    db.prepare('UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE id = ?').run(user.id);
    req.session.userId = user.id;

    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        avatarColor: user.avatar_color,
        level: user.level,
        score: user.score,
        streakDays: user.streak_days
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: '登录失败' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

app.get('/api/user/profile', requireAuth, (req, res) => {
  try {
    const user = db.prepare('SELECT id, username, nickname, avatar_color, level, score, base_cantonese, learning_goal, position, company, streak_days, created_at, last_active FROM users WHERE id = ?').get(req.session.userId);
    
    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }

    // Get learning stats
    const courseStats = db.prepare(`
      SELECT COUNT(*) as total, 
             SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed
      FROM user_courses WHERE user_id = ?
    `).get(req.session.userId);

    const partnerCount = db.prepare(
      "SELECT COUNT(*) as count FROM partner_relations WHERE (user_id = ? OR partner_id = ?) AND status = 'accepted'"
    ).get(req.session.userId, req.session.userId);

    res.json({
      ...user,
      coursesTotal: courseStats.total,
      coursesCompleted: courseStats.completed,
      partnerCount: partnerCount.count
    });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ error: '获取资料失败' });
  }
});

app.put('/api/user/profile', requireAuth, (req, res) => {
  try {
    const { nickname, position, company, learningGoal } = req.body;
    db.prepare('UPDATE users SET nickname = COALESCE(?, nickname), position = COALESCE(?, position), company = COALESCE(?, company), learning_goal = COALESCE(?, learning_goal) WHERE id = ?')
      .run(nickname, position, company, learningGoal, req.session.userId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: '更新失败' });
  }
});

app.get('/api/user/stats', requireAuth, (req, res) => {
  try {
    const userId = req.session.userId;

    const courseStats = db.prepare(`
      SELECT COUNT(*) as total, 
             SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
             SUM(score) as totalScore
      FROM user_courses WHERE user_id = ?
    `).get(userId);

    const assessmentCount = db.prepare('SELECT COUNT(*) as count FROM user_assessments WHERE user_id = ?').get(userId);

    const recentCourses = db.prepare(`
      SELECT uc.*, c.title, c.level, c.order_index 
      FROM user_courses uc 
      JOIN courses c ON uc.course_id = c.id 
      WHERE uc.user_id = ? AND uc.status = 'completed'
      ORDER BY uc.completed_at DESC LIMIT 10
    `).all(userId);

    // Learning activity (last 30 days)
    const activity = db.prepare(`
      SELECT date(completed_at) as date, COUNT(*) as count
      FROM user_courses 
      WHERE user_id = ? AND status = 'completed' AND completed_at >= date('now', '-30 days')
      GROUP BY date(completed_at)
    `).all(userId);

    res.json({
      coursesTotal: courseStats.total,
      coursesCompleted: courseStats.completed,
      totalScore: courseStats.totalScore || 0,
      assessmentCount: assessmentCount.count,
      recentCourses,
      activity
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: '获取统计失败' });
  }
});

// ==================== PARTNER ROUTES ====================
app.get('/api/partners', requireAuth, (req, res) => {
  try {
    const userId = req.session.userId;
    
    const partners = db.prepare(`
      SELECT u.id, u.nickname, u.avatar_color, u.level, u.score, u.last_active,
             pr.status, pr.id as relation_id,
             CASE WHEN pr.user_id = ? THEN 'sent' ELSE 'received' END as direction
      FROM partner_relations pr
      JOIN users u ON (CASE WHEN pr.user_id = ? THEN pr.partner_id ELSE pr.user_id END) = u.id
      WHERE (pr.user_id = ? OR pr.partner_id = ?)
      ORDER BY pr.updated_at DESC
    `).all(userId, userId, userId, userId);

    res.json(partners);
  } catch (err) {
    console.error('Partners error:', err);
    res.status(500).json({ error: '获取搭子列表失败' });
  }
});

app.get('/api/partners/recommend', requireAuth, (req, res) => {
  try {
    const userId = req.session.userId;
    const user = db.prepare('SELECT level FROM users WHERE id = ?').get(userId);

    // Find users with similar level who are not already partners
    const existingPartners = db.prepare(
      'SELECT partner_id FROM partner_relations WHERE user_id = ? UNION SELECT user_id FROM partner_relations WHERE partner_id = ?'
    ).all(userId, userId).map(r => r.partner_id);

    const excludeIds = [userId, ...existingPartners];
    const placeholders = excludeIds.map(() => '?').join(',');

    const recommended = db.prepare(`
      SELECT id, nickname, avatar_color, level, score, last_active,
             (SELECT COUNT(*) FROM user_courses WHERE user_id = users.id AND status = 'completed') as courses_completed
      FROM users 
      WHERE id NOT IN (${placeholders})
        AND level BETWEEN ? AND ?
      ORDER BY ABS(level - ?) ASC, score DESC
      LIMIT 10
    `).all(...excludeIds, Math.max(1, user.level - 1), Math.min(5, user.level + 1), user.level);

    res.json(recommended);
  } catch (err) {
    console.error('Recommend error:', err);
    res.status(500).json({ error: '获取推荐失败' });
  }
});

app.post('/api/partners/invite', requireAuth, (req, res) => {
  try {
    const userId = req.session.userId;
    const code = uuidv4().substring(0, 8).toUpperCase();
    
    // Store invite code in a relation (self-referencing for code lookup)
    db.prepare(
      'INSERT INTO partner_relations (user_id, partner_id, status, invite_code) VALUES (?, ?, ?, ?)'
    ).run(userId, userId, 'pending', code);

    res.json({ inviteCode: code, inviteLink: `/partners?join=${code}` });
  } catch (err) {
    console.error('Invite error:', err);
    res.status(500).json({ error: '生成邀请失败' });
  }
});

app.post('/api/partners/join', requireAuth, (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.session.userId;

    const invite = db.prepare(
      "SELECT * FROM partner_relations WHERE invite_code = ? AND user_id != ? AND status = 'pending'"
    ).get(code, userId);

    if (!invite) {
      return res.status(404).json({ error: '邀请码无效或已过期' });
    }

    const inviterId = invite.user_id;

    // Check if already partners
    const existing = db.prepare(
      "SELECT * FROM partner_relations WHERE ((user_id = ? AND partner_id = ?) OR (user_id = ? AND partner_id = ?)) AND status = 'accepted'"
    ).get(inviterId, userId, userId, inviterId);

    if (existing) {
      return res.status(400).json({ error: '你们已经是搭子了' });
    }

    // Check active partner count
    const partnerCount = db.prepare(
      "SELECT COUNT(*) as count FROM partner_relations WHERE (user_id = ? OR partner_id = ?) AND status = 'accepted'"
    ).get(userId, userId);

    if (partnerCount.count >= 5) {
      return res.status(400).json({ error: '你已达到最多5个活跃搭子的上限' });
    }

    // Delete the self-referencing invite record
    db.prepare('DELETE FROM partner_relations WHERE invite_code = ? AND user_id = ?').run(code, inviterId);

    // Create partner relation
    db.prepare(
      "INSERT INTO partner_relations (user_id, partner_id, status) VALUES (?, ?, 'accepted')"
    ).run(inviterId, userId);

    // Add feed entries
    db.prepare("INSERT INTO partner_feed (user_id, action, details) VALUES (?, 'found_partner', ?)").run(inviterId, `和 ${userId} 成为搭子`);
    db.prepare("INSERT INTO partner_feed (user_id, action, details) VALUES (?, 'found_partner', ?)").run(userId, `和 ${inviterId} 成为搭子`);

    res.json({ success: true });
  } catch (err) {
    console.error('Join error:', err);
    res.status(500).json({ error: '加入失败' });
  }
});

app.post('/api/partners/request/:targetUserId', requireAuth, (req, res) => {
  try {
    const userId = req.session.userId;
    const targetUserId = parseInt(req.params.targetUserId);

    if (userId === targetUserId) {
      return res.status(400).json({ error: '不能和自己成为搭子' });
    }

    const existing = db.prepare(
      'SELECT * FROM partner_relations WHERE ((user_id = ? AND partner_id = ?) OR (user_id = ? AND partner_id = ?))'
    ).get(userId, targetUserId, targetUserId, userId);

    if (existing) {
      if (existing.status === 'accepted') {
        return res.status(400).json({ error: '你们已经是搭子了' });
      }
      if (existing.status === 'pending') {
        return res.status(400).json({ error: '已有待处理的请求' });
      }
    }

    const partnerCount = db.prepare(
      "SELECT COUNT(*) as count FROM partner_relations WHERE (user_id = ? OR partner_id = ?) AND status = 'accepted'"
    ).get(userId, userId);

    if (partnerCount.count >= 5) {
      return res.status(400).json({ error: '你已达到最多5个活跃搭子的上限' });
    }

    db.prepare(
      "INSERT INTO partner_relations (user_id, partner_id, status) VALUES (?, ?, 'pending')"
    ).run(userId, targetUserId);

    res.json({ success: true });
  } catch (err) {
    console.error('Request error:', err);
    res.status(500).json({ error: '发送请求失败' });
  }
});

app.put('/api/partners/respond/:relationId', requireAuth, (req, res) => {
  try {
    const { action } = req.body; // 'accept' or 'reject'
    const relationId = parseInt(req.params.relationId);
    const userId = req.session.userId;

    const relation = db.prepare('SELECT * FROM partner_relations WHERE id = ? AND partner_id = ? AND status = ?')
      .get(relationId, userId, 'pending');

    if (!relation) {
      return res.status(404).json({ error: '请求不存在' });
    }

    if (action === 'accept') {
      const partnerCount = db.prepare(
        "SELECT COUNT(*) as count FROM partner_relations WHERE (user_id = ? OR partner_id = ?) AND status = 'accepted'"
      ).get(userId, userId);

      if (partnerCount.count >= 5) {
        return res.status(400).json({ error: '你已达到最多5个活跃搭子的上限' });
      }

      db.prepare("UPDATE partner_relations SET status = 'accepted', updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(relationId);
      
      db.prepare("INSERT INTO partner_feed (user_id, action, details) VALUES (?, 'found_partner', ?)").run(relation.user_id, `和 ${userId} 成为搭子`);
      db.prepare("INSERT INTO partner_feed (user_id, action, details) VALUES (?, 'found_partner', ?)").run(userId, `和 ${relation.user_id} 成为搭子`);
    } else {
      db.prepare("UPDATE partner_relations SET status = 'rejected', updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(relationId);
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Respond error:', err);
    res.status(500).json({ error: '操作失败' });
  }
});

app.delete('/api/partners/:relationId', requireAuth, (req, res) => {
  try {
    const relationId = parseInt(req.params.relationId);
    const userId = req.session.userId;

    const relation = db.prepare(
      'SELECT * FROM partner_relations WHERE id = ? AND (user_id = ? OR partner_id = ?)'
    ).get(relationId, userId, userId);

    if (!relation) {
      return res.status(404).json({ error: '关系不存在' });
    }

    db.prepare('DELETE FROM partner_relations WHERE id = ?').run(relationId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: '删除失败' });
  }
});

app.get('/api/partners/:id/feed', requireAuth, (req, res) => {
  try {
    const partnerId = parseInt(req.params.id);
    const userId = req.session.userId;

    // Check partner relation
    const relation = db.prepare(
      "SELECT * FROM partner_relations WHERE ((user_id = ? AND partner_id = ?) OR (user_id = ? AND partner_id = ?)) AND status = 'accepted'"
    ).get(userId, partnerId, partnerId, userId);

    if (!relation) {
      return res.status(403).json({ error: '你们不是搭子' });
    }

    const feed = db.prepare(`
      SELECT pf.*, u.nickname 
      FROM partner_feed pf 
      JOIN users u ON pf.user_id = u.id 
      WHERE pf.user_id = ? 
      ORDER BY pf.created_at DESC LIMIT 20
    `).all(partnerId);

    res.json(feed);
  } catch (err) {
    res.status(500).json({ error: '获取动态失败' });
  }
});

// ==================== ASSESSMENT ROUTES ====================
app.get('/api/assessment/questions', requireAuth, (req, res) => {
  try {
    const questions = db.prepare('SELECT * FROM assessment_questions ORDER BY RANDOM() LIMIT 10').all();
    
    const formatted = questions.map(q => {
      const data = JSON.parse(q.question_json);
      return {
        id: q.id,
        type: q.type,
        dimension: q.dimension,
        question: data.question,
        options: data.options,
        correct: data.correct,
        explanation: data.explanation
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error('Assessment questions error:', err);
    res.status(500).json({ error: '获取题目失败' });
  }
});

app.post('/api/assessment/submit', requireAuth, (req, res) => {
  try {
    const { answers } = req.body; // [{ questionId, selectedIndex }]
    const userId = req.session.userId;

    let correctCount = 0;
    const dimensionScores = { listening: 0, listening_total: 0, speaking: 0, speaking_total: 0, reading: 0, reading_total: 0, vocabulary: 0, vocabulary_total: 0 };

    for (const answer of answers) {
      const question = db.prepare('SELECT * FROM assessment_questions WHERE id = ?').get(answer.questionId);
      if (!question) continue;

      const data = JSON.parse(question.question_json);
      const isCorrect = data.correct === answer.selectedIndex;

      if (isCorrect) correctCount++;

      const dimKey = question.dimension;
      dimensionScores[dimKey] = (dimensionScores[dimKey] || 0) + (isCorrect ? 1 : 0);
      dimensionScores[dimKey + '_total'] = (dimensionScores[dimKey + '_total'] || 0) + 1;
    }

    const totalQuestions = answers.length;
    const scorePercent = Math.round((correctCount / totalQuestions) * 100);

    // Determine level
    let level;
    if (scorePercent <= 25) level = 1;
    else if (scorePercent <= 50) level = 2;
    else if (scorePercent <= 70) level = 3;
    else if (scorePercent <= 85) level = 4;
    else level = 5;

    const detailsJson = JSON.stringify({
      totalCorrect: correctCount,
      totalQuestions,
      scorePercent,
      dimensions: dimensionScores
    });

    db.prepare('INSERT INTO user_assessments (user_id, score, level, details_json) VALUES (?, ?, ?, ?)')
      .run(userId, scorePercent, level, detailsJson);

    db.prepare('UPDATE users SET level = ?, last_active = CURRENT_TIMESTAMP WHERE id = ?').run(level, userId);

    const levelLabels = ['未够班', '听得明少少', '勉强应付', '对答如流', '职场达人'];
    const levelStates = ['只会讲"雷猴""唔該"，开会全程听不懂，需要翻译', '能听懂同事闲聊的几个词，但完全不敢开口', '能参与简单工作对话，但涉及专业术语就卡壳', '能独立开粤语会议、对客沟通，偶有生词', '粤语流利，俚语行话皆通，可以带新人'];

    res.json({
      score: scorePercent,
      level,
      levelLabel: levelLabels[level - 1],
      levelState: levelStates[level - 1],
      correctCount,
      totalQuestions,
      details: dimensionScores
    });
  } catch (err) {
    console.error('Assessment submit error:', err);
    res.status(500).json({ error: '提交评估失败' });
  }
});

app.get('/api/assessment/history', requireAuth, (req, res) => {
  try {
    const history = db.prepare('SELECT * FROM user_assessments WHERE user_id = ? ORDER BY created_at DESC').all(req.session.userId);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: '获取历史失败' });
  }
});

// ==================== COURSES ROUTES ====================
app.get('/api/courses', requireAuth, (req, res) => {
  try {
    const { level } = req.query;
    const userId = req.session.userId;

    let courses;
    if (level) {
      courses = db.prepare('SELECT * FROM courses WHERE level = ? ORDER BY order_index').all(parseInt(level));
    } else {
      courses = db.prepare('SELECT * FROM courses ORDER BY level, order_index').all();
    }

    // Get user progress for each course
    const coursesWithProgress = courses.map(course => {
      const progress = db.prepare('SELECT * FROM user_courses WHERE user_id = ? AND course_id = ?').get(userId, course.id);
      return {
        ...course,
        progress: progress ? progress.status : 'not_started',
        score: progress ? progress.score : 0
      };
    });

    res.json(coursesWithProgress);
  } catch (err) {
    console.error('Courses error:', err);
    res.status(500).json({ error: '获取课程失败' });
  }
});

app.get('/api/courses/recommended', requireAuth, (req, res) => {
  try {
    const userId = req.session.userId;
    const user = db.prepare('SELECT level FROM users WHERE id = ?').get(userId);

    // Get courses at current level
    const currentLevelCourses = db.prepare(`
      SELECT c.*, uc.status, uc.score 
      FROM courses c 
      LEFT JOIN user_courses uc ON c.id = uc.course_id AND uc.user_id = ?
      WHERE c.level = ?
      ORDER BY c.order_index
    `).all(userId, user.level);

    // Calculate completion percentage
    const total = currentLevelCourses.length;
    const completed = currentLevelCourses.filter(c => c.status === 'completed').length;
    const completionPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

    let recommended = [];

    // If current level >= 80% completed, add next level courses
    if (completionPercent >= 80 && user.level < 5) {
      const nextLevelCourses = db.prepare(`
        SELECT c.*, uc.status, uc.score 
        FROM courses c 
        LEFT JOIN user_courses uc ON c.id = uc.course_id AND uc.user_id = ?
        WHERE c.level = ?
        ORDER BY c.order_index
      `).all(userId, user.level + 1);

      recommended = [
        ...currentLevelCourses.filter(c => c.status !== 'completed'),
        ...nextLevelCourses.filter(c => c.status !== 'completed')
      ];
    } else {
      recommended = currentLevelCourses.filter(c => c.status !== 'completed');
    }

    // Add difficulty labels
    const recommendedWithLabels = recommended.map(course => ({
      ...course,
      difficultyLabel: course.level === user.level ? '🟡 适中' : '🔴 有挑战'
    }));

    res.json({
      currentLevel: user.level,
      completionPercent,
      courses: recommendedWithLabels
    });
  } catch (err) {
    console.error('Recommended error:', err);
    res.status(500).json({ error: '获取推荐失败' });
  }
});

app.get('/api/courses/:id', requireAuth, (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    const userId = req.session.userId;

    const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(courseId);
    if (!course) {
      return res.status(404).json({ error: '课程不存在' });
    }

    const progress = db.prepare('SELECT * FROM user_courses WHERE user_id = ? AND course_id = ?').get(userId, courseId);

    res.json({
      ...course,
      content: JSON.parse(course.content_json),
      progress: progress ? progress.status : 'not_started',
      score: progress ? progress.score : 0
    });
  } catch (err) {
    console.error('Course detail error:', err);
    res.status(500).json({ error: '获取课程详情失败' });
  }
});

app.post('/api/courses/:id/start', requireAuth, (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    const userId = req.session.userId;

    const existing = db.prepare('SELECT * FROM user_courses WHERE user_id = ? AND course_id = ?').get(userId, courseId);

    if (existing) {
      if (existing.status === 'not_started') {
        db.prepare("UPDATE user_courses SET status = 'in_progress' WHERE id = ?").run(existing.id);
      }
    } else {
      db.prepare("INSERT INTO user_courses (user_id, course_id, status) VALUES (?, ?, 'in_progress')").run(userId, courseId);
    }

    // Add feed
    const course = db.prepare('SELECT title FROM courses WHERE id = ?').get(courseId);
    db.prepare("INSERT INTO partner_feed (user_id, action, details) VALUES (?, 'start_course', ?)")
      .run(userId, `开始学习《${course.title}》`);

    res.json({ success: true });
  } catch (err) {
    console.error('Start course error:', err);
    res.status(500).json({ error: '开始学习失败' });
  }
});

app.post('/api/courses/:id/complete', requireAuth, (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    const userId = req.session.userId;
    const { score } = req.body;

    const existing = db.prepare('SELECT * FROM user_courses WHERE user_id = ? AND course_id = ?').get(userId, courseId);

    if (existing) {
      db.prepare("UPDATE user_courses SET status = 'completed', score = ?, completed_at = CURRENT_TIMESTAMP WHERE id = ?")
        .run(score || 0, existing.id);
    } else {
      db.prepare("INSERT INTO user_courses (user_id, course_id, status, score, completed_at) VALUES (?, ?, 'completed', ?, CURRENT_TIMESTAMP)")
        .run(userId, courseId, score || 0);
    }

    // Update user score
    db.prepare('UPDATE users SET score = score + ?, last_active = CURRENT_TIMESTAMP WHERE id = ?').run(score || 0, userId);

    // Add feed
    const course = db.prepare('SELECT title FROM courses WHERE id = ?').get(courseId);
    db.prepare("INSERT INTO partner_feed (user_id, action, details) VALUES (?, 'complete_course', ?)")
      .run(userId, `完成了《${course.title}》，得分 ${score || 0}%`);

    res.json({ success: true });
  } catch (err) {
    console.error('Complete course error:', err);
    res.status(500).json({ error: '完成课程失败' });
  }
});

// ==================== PRACTICE ROUTES ====================
app.get('/api/courses/:id/practice', requireAuth, (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    const questions = db.prepare('SELECT * FROM questions WHERE course_id = ? ORDER BY RANDOM()').all(courseId);

    const formatted = questions.map(q => {
      const data = JSON.parse(q.question_json);
      return {
        id: q.id,
        type: q.type,
        question: data.question,
        options: data.options || null,
        correct: data.correct !== undefined ? data.correct : null,
        answer: data.answer || null,
        hint: data.hint || null,
        explanation: data.explanation || null,
        difficulty: q.difficulty
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error('Practice questions error:', err);
    res.status(500).json({ error: '获取练习题失败' });
  }
});

app.post('/api/courses/:id/practice/submit', requireAuth, (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    const userId = req.session.userId;
    const { answers } = req.body;

    let correctCount = 0;
    const results = [];

    for (const answer of answers) {
      const question = db.prepare('SELECT * FROM questions WHERE id = ?').get(answer.questionId);
      if (!question) continue;

      const data = JSON.parse(question.question_json);
      let isCorrect = false;

      if (question.type === 'fill') {
        isCorrect = answer.answer && answer.answer.trim().toLowerCase() === data.answer.trim().toLowerCase();
      } else {
        isCorrect = data.correct === answer.selectedIndex;
      }

      if (isCorrect) correctCount++;

      results.push({
        questionId: question.id,
        isCorrect,
        correctAnswer: question.type === 'fill' ? data.answer : (data.options ? data.options[data.correct] : null),
        explanation: data.explanation
      });
    }

    const totalQuestions = answers.length;
    const scorePercent = Math.round((correctCount / totalQuestions) * 100);

    res.json({
      score: scorePercent,
      correctCount,
      totalQuestions,
      results
    });
  } catch (err) {
    console.error('Practice submit error:', err);
    res.status(500).json({ error: '提交练习失败' });
  }
});

// ==================== CHALLENGE ROUTES ====================
app.post('/api/challenges/create', requireAuth, (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.session.userId;

    const challengeCode = uuidv4().substring(0, 6).toUpperCase();

    const result = db.prepare(
      "INSERT INTO challenges (course_id, challenger_id, status, challenge_code) VALUES (?, ?, 'pending', ?)"
    ).run(courseId, userId, challengeCode);

    res.json({ challengeId: result.lastInsertRowid, challengeCode });
  } catch (err) {
    console.error('Create challenge error:', err);
    res.status(500).json({ error: '创建对战失败' });
  }
});

// IMPORTANT: /api/challenges/my MUST come before /api/challenges/:id to avoid being captured as :id='my'
app.get('/api/challenges/my', requireAuth, (req, res) => {
  try {
    const userId = req.session.userId;

    const challenges = db.prepare(`
      SELECT c.*, co.title as course_title, co.level as course_level,
             u1.nickname as challenger_name, u2.nickname as opponent_name
      FROM challenges c
      JOIN courses co ON c.course_id = co.id
      JOIN users u1 ON c.challenger_id = u1.id
      LEFT JOIN users u2 ON c.opponent_id = u2.id
      WHERE c.challenger_id = ? OR c.opponent_id = ?
      ORDER BY c.created_at DESC LIMIT 20
    `).all(userId, userId);

    res.json(challenges);
  } catch (err) {
    console.error('My challenges error:', err);
    res.status(500).json({ error: '获取对战记录失败' });
  }
});

// Get pending challenges from my partners (so they can join)
app.get('/api/challenges/invitations', requireAuth, (req, res) => {
  try {
    const userId = req.session.userId;

    // Find pending challenges where challenger is one of my accepted partners
    const invitations = db.prepare(`
      SELECT c.*, co.title as course_title, co.level as course_level,
             u.nickname as challenger_name, u.avatar_color as challenger_avatar
      FROM challenges c
      JOIN courses co ON c.course_id = co.id
      JOIN users u ON c.challenger_id = u.id
      JOIN partner_relations pr ON (
        (pr.user_id = c.challenger_id AND pr.partner_id = ?)
        OR (pr.partner_id = c.challenger_id AND pr.user_id = ?)
      )
      WHERE c.status = 'pending'
        AND c.challenger_id != ?
        AND pr.status = 'accepted'
      ORDER BY c.created_at DESC LIMIT 10
    `).all(userId, userId, userId);

    res.json(invitations);
  } catch (err) {
    console.error('Challenge invitations error:', err);
    res.status(500).json({ error: '获取对战邀请失败' });
  }
});

app.get('/api/challenges/:id', requireAuth, (req, res) => {
  try {
    const challengeId = parseInt(req.params.id);
    if (isNaN(challengeId)) {
      return res.status(404).json({ error: '对战不存在' });
    }

    const challenge = db.prepare(`
      SELECT c.*, co.title as course_title, co.level as course_level,
             u1.nickname as challenger_name, u1.avatar_color as challenger_avatar,
             u2.nickname as opponent_name, u2.avatar_color as opponent_avatar
      FROM challenges c
      JOIN courses co ON c.course_id = co.id
      JOIN users u1 ON c.challenger_id = u1.id
      LEFT JOIN users u2 ON c.opponent_id = u2.id
      WHERE c.id = ?
    `).get(challengeId);

    if (!challenge) {
      return res.status(404).json({ error: '对战不存在' });
    }

    res.json(challenge);
  } catch (err) {
    console.error('Challenge detail error:', err);
    res.status(500).json({ error: '获取对战详情失败' });
  }
});

app.post('/api/challenges/:id/join', requireAuth, (req, res) => {
  try {
    const challengeId = parseInt(req.params.id);
    const userId = req.session.userId;

    const challenge = db.prepare("SELECT * FROM challenges WHERE id = ? AND status = 'pending'").get(challengeId);
    if (!challenge) {
      return res.status(404).json({ error: '对战不存在或已开始' });
    }

    if (challenge.challenger_id === userId) {
      return res.status(400).json({ error: '不能加入自己的对战' });
    }

    db.prepare("UPDATE challenges SET opponent_id = ?, status = 'active' WHERE id = ?").run(userId, challengeId);

    // Add feed
    const course = db.prepare('SELECT title FROM courses WHERE id = ?').get(challenge.course_id);
    db.prepare("INSERT INTO partner_feed (user_id, action, details) VALUES (?, 'challenge', ?)")
      .run(userId, `加入了《${course.title}》的对战`);

    res.json({ success: true });
  } catch (err) {
    console.error('Join challenge error:', err);
    res.status(500).json({ error: '加入对战失败' });
  }
});

app.post('/api/challenges/join-by-code', requireAuth, (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.session.userId;

    const challenge = db.prepare(
      "SELECT * FROM challenges WHERE challenge_code = ? AND status = 'pending' AND challenger_id != ?"
    ).get(code, userId);

    if (!challenge) {
      return res.status(404).json({ error: '对战码无效或对战已过期' });
    }

    db.prepare("UPDATE challenges SET opponent_id = ?, status = 'active' WHERE id = ?").run(userId, challenge.id);

    const course = db.prepare('SELECT title FROM courses WHERE id = ?').get(challenge.course_id);
    db.prepare("INSERT INTO partner_feed (user_id, action, details) VALUES (?, 'challenge', ?)")
      .run(userId, `加入了《${course.title}》的对战`);

    res.json({ success: true, challengeId: challenge.id });
  } catch (err) {
    console.error('Join by code error:', err);
    res.status(500).json({ error: '加入对战失败' });
  }
});

app.post('/api/challenges/:id/submit', requireAuth, (req, res) => {
  try {
    const challengeId = parseInt(req.params.id);
    const userId = req.session.userId;
    const { answers } = req.body;

    const challenge = db.prepare("SELECT * FROM challenges WHERE id = ? AND status = 'active'").get(challengeId);
    if (!challenge) {
      return res.status(404).json({ error: '对战不存在或已结束' });
    }

    if (challenge.challenger_id !== userId && challenge.opponent_id !== userId) {
      return res.status(403).json({ error: '你不是对战的参与者' });
    }

    let correctCount = 0;

    // Save answers and calculate score
    const insertAnswer = db.prepare(
      'INSERT INTO challenge_answers (challenge_id, user_id, question_index, answer, is_correct) VALUES (?, ?, ?, ?, ?)'
    );

    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      const question = db.prepare('SELECT * FROM questions WHERE id = ?').get(answer.questionId);
      if (!question) continue;

      const data = JSON.parse(question.question_json);
      let isCorrect = false;

      if (question.type === 'fill') {
        isCorrect = answer.answer && answer.answer.trim().toLowerCase() === data.answer.trim().toLowerCase();
      } else {
        isCorrect = data.correct === answer.selectedIndex;
      }

      if (isCorrect) correctCount++;

      insertAnswer.run(challengeId, userId, i, answer.answer || answer.selectedIndex?.toString() || '', isCorrect ? 1 : 0);
    }

    const totalQuestions = answers.length;
    const scorePercent = Math.round((correctCount / totalQuestions) * 100);

    // Update score
    if (challenge.challenger_id === userId) {
      db.prepare('UPDATE challenges SET challenger_score = ? WHERE id = ?').run(scorePercent, challengeId);
    } else {
      db.prepare('UPDATE challenges SET opponent_score = ? WHERE id = ?').run(scorePercent, challengeId);
    }

    // Check if both submitted
    const updated = db.prepare('SELECT * FROM challenges WHERE id = ?').get(challengeId);
    if (updated.challenger_score > 0 && updated.opponent_score > 0) {
      const winnerId = updated.challenger_score > updated.opponent_score ? updated.challenger_id :
                       updated.opponent_score > updated.challenger_score ? updated.opponent_id : null;

      db.prepare("UPDATE challenges SET status = 'completed', winner_id = ? WHERE id = ?").run(winnerId, challengeId);

      // Award points
      if (winnerId) {
        db.prepare('UPDATE users SET score = score + 50 WHERE id = ?').run(winnerId);
      }
      db.prepare('UPDATE users SET score = score + 20 WHERE id = ?').run(
        winnerId === updated.challenger_id ? updated.opponent_id : updated.challenger_id
      );

      // Add feed
      db.prepare("INSERT INTO partner_feed (user_id, action, details) VALUES (?, 'challenge_complete', ?)")
        .run(updated.challenger_id, `对战完成！${winnerId === updated.challenger_id ? '赢了' : '输了'}《对战》`);
    }

    res.json({
      score: scorePercent,
      correctCount,
      totalQuestions
    });
  } catch (err) {
    console.error('Challenge submit error:', err);
    res.status(500).json({ error: '提交对战答案失败' });
  }
});

// ==================== LEADERBOARD ROUTES ====================
app.get('/api/leaderboard', requireAuth, (req, res) => {
  try {
    const leaderboard = db.prepare(`
      SELECT id, nickname, avatar_color, level, score,
             (SELECT COUNT(*) FROM user_courses WHERE user_id = users.id AND status = 'completed') as courses_completed
      FROM users
      ORDER BY score DESC LIMIT 10
    `).all();

    res.json(leaderboard);
  } catch (err) {
    console.error('Leaderboard error:', err);
    res.status(500).json({ error: '获取排行榜失败' });
  }
});

app.get('/api/leaderboard/weekly', requireAuth, (req, res) => {
  try {
    const weekly = db.prepare(`
      SELECT u.id, u.nickname, u.avatar_color, u.level,
             COALESCE(SUM(uc.score), 0) as weekly_score,
             COUNT(CASE WHEN uc.status = 'completed' THEN 1 END) as weekly_courses
      FROM users u
      LEFT JOIN user_courses uc ON u.id = uc.user_id 
        AND uc.completed_at >= datetime('now', '-7 days')
      GROUP BY u.id
      ORDER BY weekly_score DESC LIMIT 10
    `).all();

    res.json(weekly);
  } catch (err) {
    console.error('Weekly leaderboard error:', err);
    res.status(500).json({ error: '获取周榜失败' });
  }
});

// ==================== PARTNER FEED ROUTE ====================
app.get('/api/feed', requireAuth, (req, res) => {
  try {
    const userId = req.session.userId;

    // Get all partner IDs
    const partnerIds = db.prepare(
      "SELECT CASE WHEN user_id = ? THEN partner_id ELSE user_id END as pid FROM partner_relations WHERE (user_id = ? OR partner_id = ?) AND status = 'accepted'"
    ).all(userId, userId, userId).map(r => r.pid);

    const allIds = [userId, ...partnerIds];
    const placeholders = allIds.map(() => '?').join(',');

    const feed = db.prepare(`
      SELECT pf.*, u.nickname, u.avatar_color
      FROM partner_feed pf
      JOIN users u ON pf.user_id = u.id
      WHERE pf.user_id IN (${placeholders})
      ORDER BY pf.created_at DESC LIMIT 30
    `).all(...allIds);

    res.json(feed);
  } catch (err) {
    console.error('Feed error:', err);
    res.status(500).json({ error: '获取动态失败' });
  }
});

// ==================== TTS ROUTES ====================
// POST /api/tts - Synthesize Cantonese speech
app.post('/api/tts', (req, res) => {
  try {
    const { text, type, voice } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: '缺少文本参数' });
    }

    if (text.length > 500) {
      return res.status(400).json({ error: '文本过长，最多500字' });
    }

    if (!TtsService.isConfigured()) {
      return res.status(503).json({ error: 'TTS服务未配置，请设置DASHSCOPE_API_KEY' });
    }

    TtsService.getSpeech(text, voice || null, type || 'default')
      .then(audioBuffer => {
        res.set({
          'Content-Type': 'audio/mpeg',
          'Content-Length': audioBuffer.length,
          'Cache-Control': 'public, max-age=3600'
        });
        res.send(audioBuffer);
      })
      .catch(err => {
        console.error('TTS error:', err.message);
        res.status(500).json({ error: '语音合成失败: ' + err.message });
      });
  } catch (err) {
    console.error('TTS route error:', err);
    res.status(500).json({ error: 'TTS请求处理失败' });
  }
});

// GET /api/tts/info - Check TTS service status
app.get('/api/tts/info', (req, res) => {
  res.json({
    configured: TtsService.isConfigured(),
    model: TtsService.TTS_MODEL,
    voice: TtsService.TTS_VOICE
  });
});

// ==================== ACTIVITY CALENDAR ====================
app.get('/api/user/activity', requireAuth, (req, res) => {
  try {
    const userId = req.session.userId;
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const month = parseInt(req.query.month) || (new Date().getMonth() + 1);

    // Get daily activity for the month
    const dailyActivity = db.prepare(`
      SELECT CAST(strftime('%d', completed_at) AS INTEGER) as day,
             COUNT(*) as count,
             SUM(uc.score) as total_score
      FROM user_courses uc
      WHERE uc.user_id = ? 
        AND uc.status = 'completed'
        AND strftime('%Y', uc.completed_at) = ?
        AND strftime('%m', uc.completed_at) = ?
      GROUP BY strftime('%d', uc.completed_at)
      ORDER BY day
    `).all(userId, String(year), String(month).padStart(2, '0'));

    // Total for the month
    const monthStats = db.prepare(`
      SELECT COUNT(*) as total_courses,
             COUNT(DISTINCT date(completed_at)) as active_days,
             COALESCE(SUM(score), 0) as total_score
      FROM user_courses
      WHERE user_id = ? AND status = 'completed'
        AND strftime('%Y-%m', completed_at) = ?
    `).get(userId, `${year}-${String(month).padStart(2, '0')}`);

    // Streak days (from user profile)
    const user = db.prepare('SELECT streak_days FROM users WHERE id = ?').get(userId);

    // Build daily_activity array with all days
    const daysInMonth = new Date(year, month, 0).getDate();
    const dailyMap = {};
    dailyActivity.forEach(d => { dailyMap[d.day] = { count: d.count, minutes: Math.round((d.total_score || 0) / 10) }; });

    const daily_activity = [];
    for (let d = 1; d <= daysInMonth; d++) {
      daily_activity.push({
        day: d,
        count: dailyMap[d] ? dailyMap[d].count : 0,
        minutes: dailyMap[d] ? dailyMap[d].minutes : 0
      });
    }

    res.json({
      year,
      month,
      total_courses: monthStats.total_courses,
      active_days: monthStats.active_days,
      streak_days: user ? user.streak_days : 0,
      daily_activity
    });
  } catch (err) {
    console.error('Activity error:', err);
    res.status(500).json({ error: '获取活跃度失败' });
  }
});

// ==================== SCENARIO CHALLENGE ROUTES ====================
app.get('/api/courses/:id/scenario', requireAuth, (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(courseId);
    if (!course) return res.status(404).json({ error: '课程不存在' });

    const content = JSON.parse(course.content_json);
    const dialogueText = content.dialogue || '';

    // Parse dialogue into turns: "A: text\nB: text\n..."
    const turns = [];
    const lines = dialogueText.split('\n').filter(l => l.trim());
    for (const line of lines) {
      const match = line.match(/^([AB]):\s*(.+)/);
      if (match) {
        turns.push({ role: match[1], text: match[2].trim() });
      }
    }

    res.json({
      course_id: course.id,
      course_title: course.title,
      course_level: course.level,
      scenario: content.scenario || '',
      turns,
      turn_count: turns.length
    });
  } catch (err) {
    console.error('Scenario error:', err);
    res.status(500).json({ error: '获取情景失败' });
  }
});

app.post('/api/challenges/scenario-create', requireAuth, (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.session.userId;
    const challengeCode = uuidv4().substring(0, 6).toUpperCase();

    const result = db.prepare(
      "INSERT INTO challenges (course_id, challenger_id, status, challenge_mode, challenge_code) VALUES (?, ?, 'pending', 'scenario', ?)"
    ).run(courseId, userId, challengeCode);

    res.json({ challengeId: result.lastInsertRowid, challengeCode, mode: 'scenario' });
  } catch (err) {
    console.error('Create scenario challenge error:', err);
    res.status(500).json({ error: '创建情景对战失败' });
  }
});

// Get scenario challenge state
app.get('/api/challenges/scenario/:id', requireAuth, (req, res) => {
  try {
    const challengeId = parseInt(req.params.id);
    const userId = req.session.userId;

    const challenge = db.prepare(`
      SELECT c.*, co.title as course_title, co.level as course_level, co.content_json,
             u1.nickname as challenger_name, u1.avatar_color as challenger_avatar,
             u2.nickname as opponent_name, u2.avatar_color as opponent_avatar
      FROM challenges c
      JOIN courses co ON c.course_id = co.id
      JOIN users u1 ON c.challenger_id = u1.id
      LEFT JOIN users u2 ON c.opponent_id = u2.id
      WHERE c.id = ? AND c.challenge_mode = 'scenario'
    `).get(challengeId);

    if (!challenge) return res.status(404).json({ error: '对战不存在' });

    // Parse dialogue
    const content = JSON.parse(challenge.content_json);
    const dialogueText = content.dialogue || '';
    const turns = [];
    const lines = dialogueText.split('\n').filter(l => l.trim());
    for (const line of lines) {
      const match = line.match(/^([AB]):\s*(.+)/);
      if (match) turns.push({ role: match[1], text: match[2].trim() });
    }

    // Get submitted turns for current user
    const submissions = db.prepare(
      'SELECT question_index, answer FROM challenge_answers WHERE challenge_id = ? AND user_id = ? ORDER BY question_index'
    ).all(challengeId, userId);

    const submittedTurns = {};
    submissions.forEach(s => { submittedTurns[s.question_index] = s.answer; });

    res.json({
      ...challenge,
      content_json: undefined,
      turns,
      submittedTurns,
      isParticipant: challenge.challenger_id === userId || challenge.opponent_id === userId,
      isChallenger: challenge.challenger_id === userId,
      isOpponent: challenge.opponent_id === userId
    });
  } catch (err) {
    console.error('Scenario challenge detail error:', err);
    res.status(500).json({ error: '获取对战详情失败' });
  }
});

// Submit a single dialogue turn
app.post('/api/challenges/scenario/:id/submit', requireAuth, (req, res) => {
  try {
    const challengeId = parseInt(req.params.id);
    const userId = req.session.userId;
    const { turnIndex, answer } = req.body;

    const challenge = db.prepare(`
      SELECT c.*, co.content_json 
      FROM challenges c JOIN courses co ON c.course_id = co.id 
      WHERE c.id = ? AND c.challenge_mode = 'scenario' AND c.status = 'active'
    `).get(challengeId);

    if (!challenge) return res.status(404).json({ error: '对战不存在或已结束' });
    if (challenge.challenger_id !== userId && challenge.opponent_id !== userId)
      return res.status(403).json({ error: '你不是对战的参与者' });

    // Parse dialogue to get expected answer
    const content = JSON.parse(challenge.content_json);
    const dialogueText = content.dialogue || '';
    const lines = dialogueText.split('\n').filter(l => l.trim());
    const bTurns = [];
    for (const line of lines) {
      const match = line.match(/^B:\s*(.+)/);
      if (match) bTurns.push(match[1].trim());
    }

    // Map turnIndex to B turn
    const bIndex = turnIndex;
    const expected = bTurns[bIndex] || '';

    // Score: simple string similarity
    const userAnswer = (answer || '').trim();
    const expectedLower = expected.toLowerCase();
    const userLower = userAnswer.toLowerCase();

    let score = 0;
    if (userLower === expectedLower) {
      score = 100;
    } else if (userLower.length > 0) {
      // Check word overlap
      const expectedWords = expectedLower.split(/\s+/);
      const userWords = userLower.split(/\s+/);
      let matches = 0;
      for (const ew of expectedWords) {
        if (userWords.some(uw => uw.includes(ew) || ew.includes(uw))) matches++;
      }
      score = expectedWords.length > 0 ? Math.round((matches / expectedWords.length) * 80) : 30;
      if (userLower.length >= 3) score = Math.max(score, 30);
    }

    // Save answer
    db.prepare(
      'INSERT OR REPLACE INTO challenge_answers (challenge_id, user_id, question_index, answer, is_correct) VALUES (?, ?, ?, ?, ?)'
    ).run(challengeId, userId, turnIndex, userAnswer, score >= 60 ? 1 : 0);

    // Update cumulative score
    const allAnswers = db.prepare(
      'SELECT is_correct FROM challenge_answers WHERE challenge_id = ? AND user_id = ?'
    ).all(challengeId, userId);
    const totalCorrect = allAnswers.filter(a => a.is_correct).length;
    const totalTurns = bTurns.length;
    const overallScore = totalTurns > 0 ? Math.round((totalCorrect / totalTurns) * 100) : 0;

    if (challenge.challenger_id === userId) {
      db.prepare('UPDATE challenges SET challenger_score = ? WHERE id = ?').run(overallScore, challengeId);
    } else {
      db.prepare('UPDATE challenges SET opponent_score = ? WHERE id = ?').run(overallScore, challengeId);
    }

    // Check if both completed (both have answers for all B turns)
    const updated = db.prepare('SELECT * FROM challenges WHERE id = ?').get(challengeId);
    const challengerAnswers = db.prepare(
      'SELECT COUNT(*) as cnt FROM challenge_answers WHERE challenge_id = ? AND user_id = ?'
    ).get(challengeId, challenge.challenger_id).cnt;

    const opponentAnswers = challenge.opponent_id ? db.prepare(
      'SELECT COUNT(*) as cnt FROM challenge_answers WHERE challenge_id = ? AND user_id = ?'
    ).get(challengeId, challenge.opponent_id).cnt : 0;

    if (challengerAnswers >= totalTurns && opponentAnswers >= totalTurns && challenge.opponent_id) {
      const winnerId = updated.challenger_score > updated.opponent_score ? updated.challenger_id :
                       updated.opponent_score > updated.challenger_score ? updated.opponent_id : null;

      db.prepare("UPDATE challenges SET status = 'completed', winner_id = ? WHERE id = ?").run(winnerId, challengeId);

      if (winnerId) {
        db.prepare('UPDATE users SET score = score + 50 WHERE id = ?').run(winnerId);
      }
      const loserId = winnerId === updated.challenger_id ? updated.opponent_id : updated.challenger_id;
      if (loserId) db.prepare('UPDATE users SET score = score + 20 WHERE id = ?').run(loserId);

      db.prepare("INSERT INTO partner_feed (user_id, action, details) VALUES (?, 'challenge_complete', ?)")
        .run(updated.challenger_id, `情景对战完成！${winnerId === updated.challenger_id ? '赢了' : winnerId ? '输了' : '平局'}《${challenge.course_title}》`);
    }

    res.json({
      score,
      expected,
      overallScore,
      totalTurns,
      completedTurns: allAnswers.length,
      allComplete: challengerAnswers >= totalTurns && opponentAnswers >= totalTurns
    });
  } catch (err) {
    console.error('Scenario submit error:', err);
    res.status(500).json({ error: '提交对话失败' });
  }
});

// ==================== SERVE SPA ====================
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🦁 粤讲粤掂 服务器启动成功！`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`👤 Demo账号: demo / demo123`);
  if (TtsService.isConfigured()) {
    console.log(`🔊 TTS粤语语音服务已启用 (${TtsService.TTS_MODEL})`);
  } else {
    console.log(`⚠️  TTS未配置，语音播放将使用浏览器内置TTS`);
  }
});

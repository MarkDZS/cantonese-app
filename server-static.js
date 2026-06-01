const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 内存数据存储
const users = [
  { id: 1, username: 'demo', password: '$2a$10$hashed', nickname: '阿明', avatar_color: '#FF6B35', level: 2, score: 150, base_cantonese: 'basic', learning_goal: '下个月外派香港', position: 'FICO顾问', company: '越秀集团', streak_days: 3, last_active: new Date().toISOString() },
  { id: 2, username: 'ahua', password: '$2a$10$hashed', nickname: '阿花', avatar_color: '#4ECDC4', level: 2, score: 120, base_cantonese: 'basic', learning_goal: '对接香港客户', position: '项目经理', company: '腾讯', streak_days: 5, last_active: new Date().toISOString() },
  { id: 3, username: 'aqiang', password: '$2a$10$hashed', nickname: '阿强', avatar_color: '#45B7D1', level: 3, score: 280, base_cantonese: 'intermediate', learning_goal: '在香港office工作', position: 'IT顾问', company: '中银香港', streak_days: 7, last_active: new Date().toISOString() },
  { id: 4, username: 'aling', password: '$2a$10$hashed', nickname: '阿玲', avatar_color: '#96CEB4', level: 1, score: 80, base_cantonese: 'none', learning_goal: '想学粤语方便工作', position: '财务分析师', company: '平安集团', streak_days: 1, last_active: new Date().toISOString() },
  { id: 5, username: 'awing', password: '$2a$10$hashed', nickname: '阿荣', avatar_color: '#FFEAA7', level: 4, score: 450, base_cantonese: 'fluent', learning_goal: '提升商务粤语', position: '高级顾问', company: '德勤', streak_days: 10, last_active: new Date().toISOString() },
];
const sessions = {};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'cantonese-app-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }
}));

// Auth middleware
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: '请先登录' });
  }
  next();
}

// Auth routes
app.post('/api/register', (req, res) => {
  const { username, password, nickname, baseCantonese, learningGoal, position, company } = req.body;
  if (!username || !password || !nickname) {
    return res.status(400).json({ error: '用户名、密码和昵称为必填项' });
  }
  const existing = users.find(u => u.username === username);
  if (existing) return res.status(400).json({ error: '用户名已存在' });

  const colors = ['#FF6B35', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98FB98', '#FFB6C1'];
  const newUser = {
    id: users.length + 1,
    username, nickname,
    avatar_color: colors[Math.floor(Math.random() * colors.length)],
    level: 1, score: 0, streak_days: 0,
    base_cantonese: baseCantonese || 'none',
    learning_goal: learningGoal || '',
    position: position || '',
    company: company || '',
    last_active: new Date().toISOString()
  };
  users.push(newUser);
  req.session.userId = newUser.id;
  res.json({ success: true, userId: newUser.id });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: '用户名或密码错误' });
  req.session.userId = user.id;
  res.json({
    success: true,
    user: { id: user.id, username: user.username, nickname: user.nickname, avatarColor: user.avatar_color, level: user.level, score: user.score, streakDays: user.streak_days }
  });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

app.get('/api/user/profile', requireAuth, (req, res) => {
  const user = users.find(u => u.id === req.session.userId);
  if (!user) return res.status(404).json({ error: '用户不存在' });
  res.json({ ...user, avatar_color: undefined, password: undefined, coursesTotal: 0, coursesCompleted: 0, partnerCount: 0 });
});

app.get('/api/courses', requireAuth, (req, res) => {
  const courses = [
    { id: 1, title: '粤语拼音基础', level: 1, order_index: 1, description: '学习粤语拼音系统' },
    { id: 2, title: '日常问候语', level: 1, order_index: 2, description: '掌握基本问候用语' },
    { id: 3, title: '办公室常用语', level: 2, order_index: 1, description: '职场粤语必备' },
    { id: 4, title: '商务会议用语', level: 3, order_index: 1, description: '商务场合专业表达' },
  ];
  res.json(courses);
});

app.get('/api/leaderboard', requireAuth, (req, res) => {
  const leaderboard = users.sort((a, b) => b.score - a.score).slice(0, 10).map(u => ({
    id: u.id, nickname: u.nickname, avatar_color: u.avatar_color, level: u.level, score: u.score
  }));
  res.json(leaderboard);
});

app.get('/api/partners', requireAuth, (req, res) => {
  res.json([]);
});

app.get('/api/feed', requireAuth, (req, res) => {
  res.json([]);
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🦁 粤讲粤掂 服务器启动成功！(静态预览模式)`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`👤 Demo账号: demo / demo123`);
});

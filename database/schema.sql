-- 粤讲粤掂 数据库 schema

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    nickname TEXT NOT NULL,
    avatar_color TEXT DEFAULT '#FF6B35',
    level INTEGER DEFAULT 1,
    score INTEGER DEFAULT 0,
    base_cantonese TEXT DEFAULT 'none',
    learning_goal TEXT DEFAULT '',
    position TEXT DEFAULT '',
    company TEXT DEFAULT '',
    streak_days INTEGER DEFAULT 0,
    last_active DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS partner_relations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    partner_id INTEGER NOT NULL,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending','accepted','rejected')),
    invite_code TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (partner_id) REFERENCES users(id),
    UNIQUE(user_id, partner_id)
);

CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    level INTEGER NOT NULL CHECK(level BETWEEN 1 AND 5),
    order_index INTEGER NOT NULL,
    description TEXT,
    content_json TEXT NOT NULL,
    difficulty_label TEXT DEFAULT '🟡 适中',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER,
    type TEXT NOT NULL CHECK(type IN ('choice','listening','matching','fill','simulation')),
    question_json TEXT NOT NULL,
    difficulty INTEGER DEFAULT 1 CHECK(difficulty BETWEEN 1 AND 5),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE IF NOT EXISTS assessment_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL CHECK(type IN ('listening','speaking','reading','vocabulary')),
    question_json TEXT NOT NULL,
    dimension TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    status TEXT DEFAULT 'not_started' CHECK(status IN ('not_started','in_progress','completed')),
    score INTEGER DEFAULT 0,
    completed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE(user_id, course_id)
);

CREATE TABLE IF NOT EXISTS user_assessments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    score INTEGER NOT NULL,
    level INTEGER NOT NULL,
    details_json TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS challenges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL,
    challenger_id INTEGER NOT NULL,
    opponent_id INTEGER,
    challenger_score INTEGER DEFAULT 0,
    opponent_score INTEGER DEFAULT 0,
    winner_id INTEGER,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending','active','completed')),
    challenge_code TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (challenger_id) REFERENCES users(id),
    FOREIGN KEY (opponent_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS challenge_answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    challenge_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    question_index INTEGER NOT NULL,
    answer TEXT,
    is_correct INTEGER DEFAULT 0,
    answered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (challenge_id) REFERENCES challenges(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS partner_feed (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    action TEXT NOT NULL,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_partner_user ON partner_relations(user_id);
CREATE INDEX IF NOT EXISTS idx_partner_partner ON partner_relations(partner_id);
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
CREATE INDEX IF NOT EXISTS idx_questions_course ON questions(course_id);
CREATE INDEX IF NOT EXISTS idx_user_courses_user ON user_courses(user_id);
CREATE INDEX IF NOT EXISTS idx_assessments_user ON user_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_challenges_challenger ON challenges(challenger_id);
CREATE INDEX IF NOT EXISTS idx_challenges_opponent ON challenges(opponent_id);
CREATE INDEX IF NOT EXISTS idx_feed_user ON partner_feed(user_id);

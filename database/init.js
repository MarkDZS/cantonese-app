const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'cantonese.db');

function initDatabase() {
  // Only initialize if database doesn't exist
  if (fs.existsSync(DB_PATH)) {
    console.log('Database already exists, skipping initialization.');
    return;
  }

  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // Run schema
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  db.exec(schema);

  console.log('Schema created.');

  db.close();

  // Run seed data via JS
  console.log('Seeding data...');
  require('./seed');
}

initDatabase();

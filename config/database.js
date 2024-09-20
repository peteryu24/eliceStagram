const sqlite3 = require('sqlite3').verbose();

// SQLite 데이터베이스 연결
const db = new sqlite3.Database('./snsApp.db', (err) => {
  if (err) {
    console.error('Error opening database: ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT
        )`);
  }
});

module.exports = db;

// userModel.js
const db = require('../config/database');

// 사용자 추가
exports.addUser = (name, email) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);  // 성공 시 추가된 사용자 ID 반환
      }
    });
  });
};

// 모든 사용자 조회
exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);  // 사용자 목록 반환
      }
    });
  });
};

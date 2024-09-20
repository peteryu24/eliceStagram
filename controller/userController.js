const db = require('../database/database');

// 사용자 추가
exports.addUser = (req, res) => {
  const { name, email } = req.body;
  console.log(req.body);
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send(`User added with ID: ${this.lastID}`);
  });
};

// 모든 사용자 조회
exports.getAllUsers = (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(rows);
  });
};

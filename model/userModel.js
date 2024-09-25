const db = require('../config/database');  

exports.addUser = async (name, email) => {
  try {
    const result = await db.query('INSERT INTO users (username, email) VALUES ($1, $2) RETURNING user_id', [name, email]);
    return result.rows[0].user_id;  
  } catch (err) {
    throw err;
  }
};

exports.getAllUsers = async () => {
  try {
    const result = await db.query('SELECT * FROM users');
    return result.rows;  
  } catch (err) {
    throw err;
  }
};

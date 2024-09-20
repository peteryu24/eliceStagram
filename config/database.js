const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',   
  host: 'localhost',       
  database: 'snsApp', 
  password: '0000', 
  port: 5432,              
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('클라이언트 연결 오류', err.stack);
  } else {
    console.log('PostgreSQL에 연결되었습니다.');
    client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100)
      )
    `, (err, res) => {
      release();
      if (err) {
        console.error('쿼리 실행 오류', err.stack);
      } else {
        console.log('users 테이블이 생성되었습니다.');
      }
    });
  }
});

module.exports = pool;

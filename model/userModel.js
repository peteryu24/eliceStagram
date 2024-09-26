const pool = require('../config/database');

// 유저 생성
exports.createUser = async (firebase_uid, email, username, profile_image_url) => {
  const query = `
    INSERT INTO users (firebase_uid, email, username, profile_image_url, created_at, updated_at)
    VALUES ($1, $2, $3, $4, NOW(), NOW());
  `;
  await pool.query(query, [firebase_uid, email, username, profile_image_url]);
};

// 유저 조회
exports.getUserByFirebaseUid = async (firebase_uid) => {
  const query = `
    SELECT * FROM users WHERE firebase_uid = $1;
  `;
  const result = await pool.query(query, [firebase_uid]);
  return result.rows[0];
};

// 유저 정보 업데이트
exports.updateUser = async (firebase_uid, username, profile_image_url) => {
  const query = `
    UPDATE users
    SET username = $1, profile_image_url = $2, updated_at = NOW()
    WHERE firebase_uid = $3;
  `;
  await pool.query(query, [username, profile_image_url, firebase_uid]);
};

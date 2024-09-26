const pool = require("../config/database");

// 피드 생성
exports.createFeed = async (user_id, description) => {
  const query = `
    INSERT INTO feed (user_id, description, created_at, updated_at)
    VALUES ($1, $2, NOW(), NOW())
    RETURNING feed_id;
  `;
  const result = await pool.query(query, [user_id, description]);
  return result.rows[0].feed_id;
};

// 단일 피드 조회
exports.getFeedById = async (feed_id) => {
  const query = `
    SELECT * FROM feed WHERE feed_id = $1;
  `;
  const result = await pool.query(query, [feed_id]);
  return result.rows[0];
};

// 모든 피드 조회
exports.getAllFeeds = async () => {
  const query = `
    SELECT * FROM feed;
  `;
  const result = await pool.query(query);
  return result.rows;
};

// 피드 수정
exports.updateFeed = async (feed_id, description) => {
  const query = `
    UPDATE feed 
    SET description = $1, updated_at = NOW()
    WHERE feed_id = $2
    RETURNING *;
  `;
  const result = await pool.query(query, [description, feed_id]);
  return result.rowCount > 0;
};

// 피드 삭제
exports.deleteFeed = async (feed_id) => {
  const query = `
    DELETE FROM feed WHERE feed_id = $1;
  `;
  const result = await pool.query(query, [feed_id]);
  return result.rowCount > 0;
};

// 피드 좋아요 상태 확인
exports.checkLikeStatus = async (user_id, feed_id) => {
  const query = `SELECT * FROM like_status WHERE user_id = $1 AND target_id = $2 AND target_type = 11`;
  const result = await pool.query(query, [user_id, feed_id]);
  return result.rowCount > 0; // 좋아요가 존재하면 true
};

// 피드 좋아요 추가
exports.likeFeed = async (user_id, feed_id) => {
  const query = `
      INSERT INTO like_status (user_id, target_id, target_type, created_at)
      VALUES ($1, $2, 11, NOW())
    `;
  await pool.query(query, [user_id, feed_id]);
};

// 피드 좋아요 카운트 증가 ++
exports.incrementLikeCount = async (feed_id) => {
  const query = `
      UPDATE feed SET like_count = like_count + 1 WHERE feed_id = $1
    `;
  await pool.query(query, [feed_id]);
};

// 피드 좋아요 취소
exports.unlikeFeed = async (user_id, feed_id) => {
  const query = `
      DELETE FROM like_status WHERE user_id = $1 AND target_id = $2 AND target_type = 11
    `;
  await pool.query(query, [user_id, feed_id]);
};

// 피드 좋아요 카운트 감소 --
exports.decrementLikeCount = async (feed_id) => {
  const query = `
      UPDATE feed SET like_count = like_count - 1 WHERE feed_id = $1
    `;
  await pool.query(query, [feed_id]);
};

// 피드 좋아요 갯수 조회
exports.getLikeCount = async (feed_id) => {
  const query = `
      SELECT like_count FROM feed WHERE feed_id = $1
    `;
  const result = await pool.query(query, [feed_id]);
  return result.rows[0].like_count;
};

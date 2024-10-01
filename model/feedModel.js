const pool = require('../config/database');

// 피드 생성
exports.createFeed = async (firebase_uid, description) => {
  const query = `
    INSERT INTO feed (firebase_uid, description, created_at, updated_at)
    VALUES ($1, $2, NOW(), NOW())
    RETURNING feed_id;
  `;
  const result = await pool.query(query, [firebase_uid, description]);
  return result.rows[0].feed_id;
};

// 피드 이미지 추가
exports.addFeedImages = async (feed_id, imageUrls) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const insertImageQuery = `
      INSERT INTO feed_image (feed_id, image_url, created_at, updated_at)
      VALUES ($1, $2, NOW(), NOW());
    `;

    for (const imageUrl of imageUrls) {
      await client.query(insertImageQuery, [feed_id, imageUrl]);
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};


// 단일 피드 조회
exports.getFeedById = async (feed_id) => {
  const query = `
    SELECT feed_id, firebase_uid, description, like_count, comment_count, created_at
    FROM feed WHERE feed_id = $1;
  `;
  const result = await pool.query(query, [feed_id]);
  return result.rows[0];
};

// 모든 피드 조회
exports.getAllFeeds = async () => {
  const query = `
    SELECT feed_id, firebase_uid, description, like_count, comment_count, created_at
    FROM feed
    ORDER BY created_at DESC;
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

// 피드 이미지 수정
exports.updateFeedImage = async (feed_id, image_id, newImageUrl) => {
  const query = `
    UPDATE feed_image
    SET image_url = $1, updated_at = NOW()
    WHERE feed_id = $2 AND feed_image_id = $3;
  `;
  const result = await pool.query(query, [newImageUrl, feed_id, image_id]);
  return result.rowCount > 0;
};

// 피드 이미지 삭제
exports.deleteFeedImage = async (feed_id, image_id) => {
  const query = `
    DELETE FROM feed_image
    WHERE feed_id = $1 AND feed_image_id = $2;
  `;
  const result = await pool.query(query, [feed_id, image_id]);
  return result.rowCount > 0;
};

// 피드 이미지 수 확인
exports.getFeedImageCount = async (feed_id) => {
  const query = `
    SELECT COUNT(*) as image_count
    FROM feed_image
    WHERE feed_id = $1;
  `;
  const result = await pool.query(query, [feed_id]);
  return parseInt(result.rows[0].image_count, 10);
};


// 피드 좋아요 상태 확인
exports.checkLikeStatus = async (firebase_uid, feed_id) => {
  const query = `
    SELECT * FROM like_status
    WHERE firebase_uid = $1 AND target_id = $2 AND target_type = 11;
  `;
  const result = await pool.query(query, [firebase_uid, feed_id]);
  return result.rowCount > 0; 
};

// 피드 좋아요 추가
exports.likeFeed = async (firebase_uid, feed_id) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const insertLikeQuery = `
      INSERT INTO like_status (firebase_uid, target_id, target_type, created_at)
      VALUES ($1, $2, 11, NOW());
    `;
    await client.query(insertLikeQuery, [firebase_uid, feed_id]);

    const incrementLikeCountQuery = `
      UPDATE feed SET like_count = like_count + 1 WHERE feed_id = $1;
    `;
    await client.query(incrementLikeCountQuery, [feed_id]);

    await client.query('COMMIT');
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// 트랜잭션: 피드 좋아요 취소 - 카운트 감소
exports.unlikeFeed = async (firebase_uid, feed_id) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const checkLikeStatusQuery = `
      SELECT * FROM like_status
      WHERE firebase_uid = $1 AND target_id = $2 AND target_type = 11;
    `;
    const likeStatusResult = await client.query(checkLikeStatusQuery, [firebase_uid, feed_id]);

    if (likeStatusResult.rowCount === 0) { 
      throw new Error("Not liked this feed before, cannot unlike.");
    }

    
    const deleteLikeQuery = `
      DELETE FROM like_status
      WHERE firebase_uid = $1 AND target_id = $2 AND target_type = 11;
    `;
    await client.query(deleteLikeQuery, [firebase_uid, feed_id]);

    // 어뷰징 방지
    const decrementLikeCountQuery = `
      UPDATE feed SET like_count = GREATEST(like_count - 1, 0) WHERE feed_id = $1;
    `;
    await client.query(decrementLikeCountQuery, [feed_id]);

    await client.query('COMMIT');
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};


// 피드 좋아요 갯수 조회
exports.getLikeCount = async (feed_id) => {
  const query = `
    SELECT like_count FROM feed WHERE feed_id = $1;
  `;
  const result = await pool.query(query, [feed_id]);
  return result.rows[0].like_count;
};

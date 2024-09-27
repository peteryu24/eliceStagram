const pool = require('../config/database');

// 댓글 생성
exports.createComment = async (firebase_uid, feed_id, description) => {
  const query = `
    INSERT INTO comment (firebase_uid, feed_id, description, created_at, updated_at)
    VALUES ($1, $2, $3, NOW(), NOW())
    RETURNING comment_id;
  `;
  const result = await pool.query(query, [firebase_uid, feed_id, description]);
  return result.rows[0].comment_id;
};

// 단일 댓글 조회
exports.getCommentById = async (comment_id) => {
  const query = `
    SELECT comment_id, firebase_uid, feed_id, description, like_count, created_at 
    FROM comment WHERE comment_id = $1;
  `;
  const result = await pool.query(query, [comment_id]);
  return result.rows[0];  // 'created_at' 포함
};

// 특정 피드에 대한 모든 댓글 조회
exports.getAllCommentsByFeedId = async (feed_id) => {
  const query = `
    SELECT comment_id, firebase_uid, description, like_count, created_at 
    FROM comment WHERE feed_id = $1;
  `;
  const result = await pool.query(query, [feed_id]);
  return result.rows;  // 'created_at' 포함
};

// 댓글 수정
exports.updateComment = async (comment_id, description) => {
  const query = `
    UPDATE comment
    SET description = $1, updated_at = NOW()
    WHERE comment_id = $2
    RETURNING *;
  `;
  const result = await pool.query(query, [description, comment_id]);
  return result.rowCount > 0;
};

// 댓글 삭제
exports.deleteComment = async (comment_id) => {
  const query = `
    DELETE FROM comment WHERE comment_id = $1;
  `;
  const result = await pool.query(query, [comment_id]);
  return result.rowCount > 0;
};

// 댓글 좋아요 상태 확인
exports.checkCommentLikeStatus = async (firebase_uid, comment_id) => {
    const query = `
      SELECT * FROM like_status
      WHERE firebase_uid = $1 AND target_id = $2 AND target_type = 12;
    `;
    const result = await pool.query(query, [firebase_uid, comment_id]);
    return result.rowCount > 0;
  };
  
  // 댓글 좋아요 추가
  exports.likeComment = async (firebase_uid, comment_id) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
  
      const insertLikeQuery = `
        INSERT INTO like_status (firebase_uid, target_id, target_type, created_at)
        VALUES ($1, $2, 12, NOW());
      `;
      await client.query(insertLikeQuery, [firebase_uid, comment_id]);
  
      const incrementLikeCountQuery = `
        UPDATE comment SET like_count = like_count + 1 WHERE comment_id = $1;
      `;
      await client.query(incrementLikeCountQuery, [comment_id]);
  
      await client.query('COMMIT');
      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  };
  
  // 댓글 좋아요 취소
  exports.unlikeComment = async (firebase_uid, comment_id) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
  
      const deleteLikeQuery = `
        DELETE FROM like_status
        WHERE firebase_uid = $1 AND target_id = $2 AND target_type = 12;
      `;
      await client.query(deleteLikeQuery, [firebase_uid, comment_id]);
  
      const decrementLikeCountQuery = `
        UPDATE comment SET like_count = like_count - 1 WHERE comment_id = $1;
      `;
      await client.query(decrementLikeCountQuery, [comment_id]);
  
      await client.query('COMMIT');
      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  };
  
  // 댓글 좋아요 갯수 확인
  exports.getCommentLikeCount = async (comment_id) => {
    const query = `
      SELECT like_count FROM comment WHERE comment_id = $1;
    `;
    const result = await pool.query(query, [comment_id]);
    return result.rows[0].like_count;
  };
  
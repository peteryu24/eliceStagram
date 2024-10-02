const pool = require('../config/database');

// 알림 생성
exports.createNotification = async (receiver_id, actor_id, target_id, target_type, notification_type) => {
  const query = `
    INSERT INTO notification (receiver_id, actor_id, target_id, target_type, notification_type, is_read, created_at)
    VALUES ($1, $2, $3, $4, $5, false, NOW())
    RETURNING notification_id;
  `;
  const result = await pool.query(query, [receiver_id, actor_id, target_id, target_type, notification_type]);
  return result.rows[0].notification_id;
};

//사용자의 모든 알림 조회
exports.getNotificationsByUserId = async (user_id) => {
  const query = `
    SELECT * FROM notification WHERE receiver_id = $1 ORDER BY created_at DESC;
  `;
  const result = await pool.query(query, [user_id]);
  return result.rows;
};

//알림 읽음 상태로
exports.markAsRead = async (notification_id) => {
  const query = `
    UPDATE notification SET is_read = true WHERE notification_id = $1;
  `;
  await pool.query(query, [notification_id]);
};

// 알림 삭제
exports.deleteNotification = async (notification_id) => {
    const query = `
      DELETE FROM notification WHERE notification_id = $1;
    `;
    const result = await pool.query(query, [notification_id]);
    return result.rowCount > 0;
  };
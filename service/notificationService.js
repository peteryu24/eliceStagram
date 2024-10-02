const notificationModel = require('../model/notificationModel');

const handleError = (action, error) => {
  console.error(`Error ${action}: ${error.message}`);
  throw new Error(error.message);
};

//알림 생성
exports.createNotification = async (receiver_id, actor_id, target_id, target_type, notification_type) => {
  try {
    return await notificationModel.createNotification(receiver_id, actor_id, target_id, target_type, notification_type);
  } catch (error) {
    handleError('cannot create notification', error);
  }
};

//사용자의 모든 알림 조회
exports.getNotificationsByUserId = async (receiver_id) => {
  try {
    return await notificationModel.getNotificationsByUserId(receiver_id);
  } catch (error) {
    handleError('no notifications', error);
  }
};

//알림 읽음 처리
exports.markAsRead = async (notification_id) => {
  try {
    return await notificationModel.markAsRead(notification_id);
  } catch (error) {
    handleError('marking notification as read', error);
  }
};

//알림 삭제
exports.deleteNotification = async (notification_id) => {
    try {
        return await notificationModel.deleteNotification(notification_id);
    } catch(error) {
        handleError('no notifications founded to delete', error);
    }
};
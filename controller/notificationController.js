const notificationService = require('../service/notificationService');
const { validate: isUuid } = require('uuid');

// 공통 응답 처리 함수
const snsAppResponse = (res, promise, successMessage, notFoundMessage) => {
  promise
    .then((result) => {
      if (result !== undefined && result !== null) {
        res.status(200).json({ message: successMessage, result });
      } else {
        res.status(404).json({ message: notFoundMessage });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ message: `Error: ${error.message}` });
    });
};

// 알림 생성
exports.createNotification = (req, res) => {
  const { receiver_id, actor_id, target_id, target_type, notification_type } = req.body;
  snsAppResponse(
    res,
    notificationService.createNotification(receiver_id, actor_id, target_id, target_type, notification_type),
    'Notification created',
    'Failed to create notification'
  );
};

// 사용자의 모든 알림 조회
exports.getNotificationsByUserId = (req, res) => {
  const { receiver_id } = req.params;
  snsAppResponse(
    res,
    notificationService.getNotificationsByUserId(receiver_id),
    'Notifications retrieved',
    'No notifications found'
  );
};

// 알림 읽음 처리
exports.markAsRead = (req, res) => {
  const { notification_id } = req.params;
  snsAppResponse(
    res,
    notificationService.markAsRead(notification_id),
    'Notification marked as read',
    'Notification not found'
  );
};

// 알림 삭제
exports.deleteNotification = (req, res) => {
  const { notification_id } = req.params;
  snsAppResponse(
    res,
    notificationService.deleteNotification(notification_id),
    'Notification deleted',
    'Notification not found'
  );
};

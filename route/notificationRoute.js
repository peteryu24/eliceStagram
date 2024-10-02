const express = require('express');
const notificationController = require('../controller/notificationController');
const authMiddleware = require('../config/authMiddleware');
const uuidMiddleware = require('../config/uuidMiddleware');

const router = express.Router();

// 인증 미들웨어 적용
router.use(authMiddleware);

// 알림 조회
router.get('/', notificationController.getAllNotifications);

// 알림 읽음 처리
router.put('/:notification_id/read', uuidMiddleware('notification_id'), notificationController.markAsRead);

// 알림 삭제
router.delete('/:notification_id', uuidMiddleware('notification_id'), notificationController.deleteNotification);

module.exports = router;

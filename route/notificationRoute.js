const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notificationController');
const authMiddleware = require('../config/authMiddleware'); 

router.use(authMiddleware);

// 알림 생성
router.post('/', notificationController.createNotification);

// 사용자의 모든 알림 조회
router.get('/:receiver_id', notificationController.getNotificationsByUserId);

// 알림 읽음 처리
router.put('/:notification_id/read', notificationController.markAsRead);

// 알림 삭제
router.delete('/:notification_id', notificationController.deleteNotification);

module.exports = router;

const express = require('express');
const feedController = require('../controller/feedController');
const authMiddleware = require('../config/authMiddleware');
const uuidMiddleware = require('../config/uuidMiddleware');

const router = express.Router();

router.use(authMiddleware);

// 피드 생성
router.post('/', feedController.createFeed);

// 단일 피드 조회
router.get('/:feed_id', uuidMiddleware('feed_id'), feedController.getFeedById);

// 모든 피드 조회
router.get('/', feedController.getAllFeeds);

// 피드 수정
router.put('/:feed_id', uuidMiddleware('feed_id'), feedController.updateFeed);

// 피드 삭제
router.delete('/:feed_id', uuidMiddleware('feed_id'), feedController.deleteFeed);

// 피드 좋아요 추가
router.post('/:feed_id/like', uuidMiddleware('feed_id'), feedController.likeFeed);

// 피드 좋아요 취소
router.delete('/:feed_id/like', uuidMiddleware('feed_id'), feedController.unlikeFeed);

// 피드 좋아요 상태 확인
router.get('/:feed_id/like/status', uuidMiddleware('feed_id'), feedController.checkLikeStatus);

// 피드 좋아요 갯수 확인
router.get('/:feed_id/like/count', uuidMiddleware('feed_id'), feedController.getLikeCount);

module.exports = router;

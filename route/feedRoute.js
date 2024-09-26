const express = require('express');
const router = express.Router();
const feedController = require('../controller/feedController');

// 피드 생성
router.post('/', feedController.createFeed);

// 단일 피드 조회
router.get('/:feed_id', feedController.getFeedById);

// 모든 피드 조회
router.get('/', feedController.getAllFeeds);

// 피드 수정
router.put('/:feed_id', feedController.updateFeed);

// 피드 삭제
router.delete('/:feed_id', feedController.deleteFeed);

// 피드 좋아요 추가 (좋아요 누르기)
router.post('/:feed_id/like', feedController.likeFeed);

// 피드 좋아요 취소
router.delete('/:feed_id/like', feedController.unlikeFeed);

// 피드 좋아요 상태 확인 (현재 사용자가 좋아요를 눌렀는지)
router.get('/:feed_id/like/status', feedController.checkLikeStatus);

// 피드 좋아요 갯수 확인
router.get('/:feed_id/like/count', feedController.getLikeCount);

module.exports = router;

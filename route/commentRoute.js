const express = require('express');
const commentController = require('../controller/commentController');
const authMiddleware = require('../config/authMiddleware');
const uuidMiddleware = require('../config/uuidMiddleware');

const router = express.Router();

// 인증 미들웨어 적용
router.use(authMiddleware);

// 댓글 생성
router.post('/:feed_id/comments', uuidMiddleware('feed_id'), commentController.createComment);

// 단일 댓글 조회
router.get('/comments/:comment_id', uuidMiddleware('comment_id'), commentController.getCommentById);

// 특정 피드의 모든 댓글 조회
router.get('/:feed_id/comments', uuidMiddleware('feed_id'), commentController.getAllCommentsByFeedId);

// 댓글 수정
router.put('/comments/:comment_id', uuidMiddleware('comment_id'), commentController.updateComment);

// 댓글 삭제
router.delete('/comments/:comment_id', uuidMiddleware('comment_id'), commentController.deleteComment);

// 댓글 좋아요 추가
router.post('/comments/:comment_id/like', uuidMiddleware('comment_id'), commentController.likeComment);

// 댓글 좋아요 취소
router.delete('/comments/:comment_id/like', uuidMiddleware('comment_id'), commentController.unlikeComment);

// 댓글 좋아요 상태 확인
router.get('/comments/:comment_id/like/status', uuidMiddleware('comment_id'), commentController.checkCommentLikeStatus);

// 댓글 좋아요 갯수 확인
router.get('/comments/:comment_id/like/count', uuidMiddleware('comment_id'), commentController.getCommentLikeCount);

module.exports = router;

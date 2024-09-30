const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');
const authMiddleware = require('../config/authMiddleware'); 

router.use(authMiddleware);

// 댓글 생성
router.post('/:feed_id/comments', commentController.createComment);

// 단일 댓글 조회
router.get('/comments/:comment_id', commentController.getCommentById);

// 특정 피드에 대한 모든 댓글 조회
router.get('/:feed_id/comments', commentController.getAllCommentsByFeedId);

// 댓글 수정
router.put('/comments/:comment_id', commentController.updateComment);

// 댓글 삭제
router.delete('/comments/:comment_id', commentController.deleteComment);

// 댓글 좋아요 누르기
router.post('/comments/:comment_id/like', commentController.likeComment);

// 댓글 좋아요 취소
router.delete('/comments/:comment_id/like', commentController.unlikeComment);

// 댓글 좋아요 상태 확인
router.get('/comments/:comment_id/like/status', commentController.checkCommentLikeStatus);

// 댓글 좋아요 갯수 확인
router.get('/comments/:comment_id/like/count', commentController.getCommentLikeCount);

module.exports = router;

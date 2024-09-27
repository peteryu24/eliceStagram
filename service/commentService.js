const commentModel = require('../model/commentModel');

// 댓글 생성
exports.createComment = async (firebase_uid, feed_id, description) => {
  return await commentModel.createComment(firebase_uid, feed_id, description);
};

// 단일 댓글 조회
exports.getCommentById = async (comment_id) => {
  return await commentModel.getCommentById(comment_id);
};

// 특정 피드에 대한 모든 댓글 조회
exports.getAllCommentsByFeedId = async (feed_id) => {
  return await commentModel.getAllCommentsByFeedId(feed_id);
};

// 댓글 수정 (권한 확인)
exports.updateComment = async (comment_id, firebase_uid, description) => {
  const comment = await commentModel.getCommentById(comment_id);
  if (comment.firebase_uid !== firebase_uid) {
    throw new Error('Permission denied');
  }
  return await commentModel.updateComment(comment_id, description);
};

// 댓글 삭제 (권한 확인)
exports.deleteComment = async (comment_id, firebase_uid) => {
  const comment = await commentModel.getCommentById(comment_id);
  if (comment.firebase_uid !== firebase_uid) {
    throw new Error('Permission denied');
  }
  return await commentModel.deleteComment(comment_id);
};

// 댓글 좋아요 누르기
exports.likeComment = async (firebase_uid, comment_id) => {
  const liked = await commentModel.checkCommentLikeStatus(firebase_uid, comment_id);
  if (liked) {
    throw new Error('Already liked this comment');
  }
  return await commentModel.likeComment(firebase_uid, comment_id);
};

// 댓글 좋아요 취소
exports.unlikeComment = async (firebase_uid, comment_id) => {
  const liked = await commentModel.checkCommentLikeStatus(firebase_uid, comment_id);
  if (!liked) {
    throw new Error('You haven\'t liked this comment before');
  }
  return await commentModel.unlikeComment(firebase_uid, comment_id);
};

// 댓글 좋아요 상태 확인
exports.checkCommentLikeStatus = async (firebase_uid, comment_id) => {
  return await commentModel.checkCommentLikeStatus(firebase_uid, comment_id);
};

// 댓글 좋아요 갯수 확인
exports.getCommentLikeCount = async (comment_id) => {
  return await commentModel.getCommentLikeCount(comment_id);
};


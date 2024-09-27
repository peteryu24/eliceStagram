const commentModel = require("../model/commentModel");

// 공통 에러 처리 함수
const handleError = (action, error) => {
  console.error(`Error ${action}: ${error.message}`);
  throw new Error(error.message);
};

// 댓글 생성
exports.createComment = async (firebase_uid, feed_id, description) => {
  try {
    return await commentModel.createComment(firebase_uid, feed_id, description);
  } catch (error) {
    handleError("creating comment", error);
  }
};

// 단일 댓글 조회
exports.getCommentById = async (comment_id) => {
  try {
    return await commentModel.getCommentById(comment_id.trim());
  } catch (error) {
    handleError("retrieving comment", error);
  }
};

// 특정 피드에 대한 모든 댓글 조회
exports.getAllCommentsByFeedId = async (feed_id) => {
  try {
    return await commentModel.getAllCommentsByFeedId(feed_id.trim());
  } catch (error) {
    handleError("retrieving comments for feed", error);
  }
};

// 댓글 수정 (권한 확인)
exports.updateComment = async (comment_id, firebase_uid, description) => {
  try {
    const comment = await commentModel.getCommentById(comment_id);
    if (comment.firebase_uid !== firebase_uid) {
      throw new Error("Permission denied");
    }
    return await commentModel.updateComment(comment_id, description);
  } catch (error) {
    handleError("updating comment", error);
  }
};

// 댓글 삭제 (권한 확인)
exports.deleteComment = async (comment_id, firebase_uid) => {
  try {
    const comment = await commentModel.getCommentById(comment_id);
    if (comment.firebase_uid !== firebase_uid) {
      throw new Error("Permission denied");
    }
    return await commentModel.deleteComment(comment_id);
  } catch (error) {
    handleError("deleting comment", error);
  }
};

// 댓글 좋아요 누르기
exports.likeComment = async (firebase_uid, comment_id) => {
  try {
    const liked = await commentModel.checkCommentLikeStatus(firebase_uid, comment_id);
    if (liked) {
      throw new Error("Already liked this comment");
    }
    return await commentModel.likeComment(firebase_uid, comment_id);
  } catch (error) {
    handleError("liking comment", error);
  }
};

// 댓글 좋아요 취소
exports.unlikeComment = async (firebase_uid, comment_id) => {
  try {
    const liked = await commentModel.checkCommentLikeStatus(firebase_uid, comment_id);
    if (!liked) {
      throw new Error("You haven't liked this comment before");
    }
    return await commentModel.unlikeComment(firebase_uid, comment_id);
  } catch (error) {
    handleError("unliking comment", error);
  }
};

// 댓글 좋아요 상태 확인
exports.checkCommentLikeStatus = async (firebase_uid, comment_id) => {
  try {
    return await commentModel.checkCommentLikeStatus(firebase_uid, comment_id);
  } catch (error) {
    handleError("checking comment like status", error);
  }
};

// 댓글 좋아요 갯수 확인
exports.getCommentLikeCount = async (comment_id) => {
  try {
    return await commentModel.getCommentLikeCount(comment_id);
  } catch (error) {
    handleError("getting comment like count", error);
  }
};

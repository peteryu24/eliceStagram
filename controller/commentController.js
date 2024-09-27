const commentService = require('../service/commentService');
const { validate: isUuid } = require('uuid');

// 댓글 생성
exports.createComment = (req, res) => {
  const { description } = req.body;
  const { feed_id } = req.params;
  const firebase_uid = req.firebase_uid;

  // feed_id 검증
  if (!isUuid(feed_id)) {
    return res.status(400).json({ message: 'Invalid feed_id format' });
  }

  snsAppResponse(
    res,
    commentService.createComment(firebase_uid, feed_id, description),
    'Comment created',
    'Failed to create comment'
  );
};

// 단일 댓글 조회
exports.getCommentById = (req, res) => {
  const { comment_id } = req.params;

  if (!isUuid(comment_id)) {
    return res.status(400).json({ message: 'Invalid comment_id format' });
  }

  snsAppResponse(
    res,
    commentService.getCommentById(comment_id),
    'Comment retrieved',
    `Comment with ID ${comment_id} not found`
  );
};

// 특정 피드에 대한 모든 댓글 조회
exports.getAllCommentsByFeedId = (req, res) => {
  const { feed_id } = req.params;

  if (!isUuid(feed_id)) {
    return res.status(400).json({ message: 'Invalid feed_id format' });
  }

  snsAppResponse(
    res,
    commentService.getAllCommentsByFeedId(feed_id),
    'Comments retrieved',
    `No comments found for feed with ID ${feed_id}`
  );
};

// 댓글 수정
exports.updateComment = (req, res) => {
  const { comment_id } = req.params;
  const { description } = req.body;
  const firebase_uid = req.firebase_uid;

  if (!isUuid(comment_id)) {
    return res.status(400).json({ message: 'Invalid comment_id format' });
  }

  snsAppResponse(
    res,
    commentService.updateComment(comment_id, firebase_uid, description),
    'Comment updated',
    `Comment with ID ${comment_id} not found`
  );
};

// 댓글 삭제
exports.deleteComment = (req, res) => {
  const { comment_id } = req.params;
  const firebase_uid = req.firebase_uid;

  if (!isUuid(comment_id)) {
    return res.status(400).json({ message: 'Invalid comment_id format' });
  }

  snsAppResponse(
    res,
    commentService.deleteComment(comment_id, firebase_uid),
    'Comment deleted',
    `Comment with ID ${comment_id} not found`
  );
};

// 댓글 좋아요 누르기
exports.likeComment = (req, res) => {
    const { comment_id } = req.params;
    const firebase_uid = req.firebase_uid;
  
    if (!isUuid(comment_id)) {
      return res.status(400).json({ message: 'Invalid comment_id format' });
    }
  
    snsAppResponse(
      res,
      commentService.likeComment(firebase_uid, comment_id),
      'Comment liked',
      `Comment with ID ${comment_id} not found`
    );
  };
  
  // 댓글 좋아요 취소
  exports.unlikeComment = (req, res) => {
    const { comment_id } = req.params;
    const firebase_uid = req.firebase_uid;
  
    if (!isUuid(comment_id)) {
      return res.status(400).json({ message: 'Invalid comment_id format' });
    }
  
    snsAppResponse(
      res,
      commentService.unlikeComment(firebase_uid, comment_id),
      'Comment unliked',
      `Comment with ID ${comment_id} not found`
    );
  };
  
  // 댓글 좋아요 상태 확인
  exports.checkCommentLikeStatus = (req, res) => {
    const { comment_id } = req.params;
    const firebase_uid = req.firebase_uid;
  
    if (!isUuid(comment_id)) {
      return res.status(400).json({ message: 'Invalid comment_id format' });
    }
  
    snsAppResponse(
      res,
      commentService.checkCommentLikeStatus(firebase_uid, comment_id),
      'Like status retrieved',
      `Comment with ID ${comment_id} not found`
    );
  };
  
  // 댓글 좋아요 갯수 확인
  exports.getCommentLikeCount = (req, res) => {
    const { comment_id } = req.params;
  
    if (!isUuid(comment_id)) {
      return res.status(400).json({ message: 'Invalid comment_id format' });
    }
  
    snsAppResponse(
      res,
      commentService.getCommentLikeCount(comment_id),
      'Like count retrieved',
      `Comment with ID ${comment_id} not found`
    );
  };
  

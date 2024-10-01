const feedService = require('../service/feedService');
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

      if (error.message.includes('Permission denied')) {
        res.status(403).json({ message: error.message });
      } else {
        res.status(500).json({ message: `Error: ${error.message}` });
      }
    });
};

// 피드 생성
exports.createFeed = (req, res) => {
  const { description, imageUrls } = req.body; // imageUrls는 배열로
  const firebase_uid = req.firebase_uid;

  snsAppResponse(
    res,
    feedService.createFeed(firebase_uid, description, imageUrls),  
    'Feed created',
    'Failed to create feed'
  );
};


// 단일 피드 조회
exports.getFeedById = (req, res) => {
  const { feed_id } = req.params;

  // feed_id 검증
  if (!isUuid(feed_id)) {
    return res.status(400).json({ message: 'Invalid feed_id format' });
  }

  snsAppResponse(
    res,
    feedService.getFeedById(feed_id),
    'Feed retrieved',
    `Feed with ID ${feed_id} not found. Can't get feed`
  );
};

// 모든 피드 조회
exports.getAllFeeds = (req, res) => {
  snsAppResponse(
    res,
    feedService.getAllFeeds(),
    'Feeds retrieved',
    'No feeds available'
  );
};

// 피드 수정
exports.updateFeed = (req, res) => {
  const { feed_id } = req.params;
  const { description } = req.body;
  const firebase_uid = req.firebase_uid;

  // feed_id 검증
  if (!isUuid(feed_id)) {
    return res.status(400).json({ message: 'Invalid feed_id format' });
  }

  snsAppResponse(
    res,
    feedService.updateFeed(feed_id, firebase_uid, description),
    'Feed updated',
    `Feed with ID ${feed_id} not found. Can't update feed`
  );
};

// 피드 삭제
exports.deleteFeed = (req, res) => {
  const { feed_id } = req.params;
  const firebase_uid = req.firebase_uid;

  // feed_id 검증
  if (!isUuid(feed_id)) {
    return res.status(400).json({ message: 'Invalid feed_id format' });
  }

  snsAppResponse(
    res,
    feedService.deleteFeed(feed_id, firebase_uid),
    'Feed deleted',
    `Feed with ID ${feed_id} not found. Can't delete feed`
  );
};

// 피드 이미지 수정
exports.updateFeedImage = (req, res) => {
  const { feed_id, image_id } = req.params;
  const { newImageUrl } = req.body;
  const firebase_uid = req.firebase_uid;

  snsAppResponse(
    res,
    feedService.updateFeedImage(firebase_uid, feed_id, image_id, newImageUrl),
    'Feed image updated',
    'Failed to update feed image'
  );
};

// 피드 이미지 삭제
exports.deleteFeedImage = (req, res) => {
  const { feed_id, image_id } = req.params;
  const firebase_uid = req.firebase_uid;

  snsAppResponse(
    res,
    feedService.deleteFeedImage(firebase_uid, feed_id, image_id),
    'Feed image deleted',
    'Can\'t delete feed image'
  );
};


// 피드 좋아요 누르기
exports.likeFeed = (req, res) => {
  const { feed_id } = req.params;
  const firebase_uid = req.firebase_uid;

  // feed_id 검증
  if (!isUuid(feed_id)) {
    return res.status(400).json({ message: 'Invalid feed_id format' });
  }

  snsAppResponse(
    res,
    feedService.likeFeed(firebase_uid, feed_id),
    'Feed liked',
    `Feed with ID ${feed_id} not found. Can't like feed`
  );
};

// 피드 좋아요 취소
exports.unlikeFeed = (req, res) => {
  const { feed_id } = req.params;
  const firebase_uid = req.firebase_uid;

  // feed_id 검증
  if (!isUuid(feed_id)) {
    return res.status(400).json({ message: 'Invalid feed_id format' });
  }

  snsAppResponse(
    res,
    feedService.unlikeFeed(firebase_uid, feed_id),
    'Feed unliked',
    `Feed with ID ${feed_id} not found. Can't unlike feed`
  );
};

// 피드 좋아요 상태 확인
exports.checkLikeStatus = (req, res) => {
  const { feed_id } = req.params;
  const firebase_uid = req.firebase_uid;

  // feed_id 검증
  if (!isUuid(feed_id)) {
    return res.status(400).json({ message: 'Invalid feed_id format' });
  }

  snsAppResponse(
    res,
    feedService.checkLikeStatus(firebase_uid, feed_id),
    'Like status retrieved',
    `Feed with ID ${feed_id} not found. Can't check like status`
  );
};

// 피드 좋아요 갯수 확인
exports.getLikeCount = (req, res) => {
  const { feed_id } = req.params;

  // feed_id 검증
  if (!isUuid(feed_id)) {
    return res.status(400).json({ message: 'Invalid feed_id format' });
  }

  snsAppResponse(
    res,
    feedService.getLikeCount(feed_id),
    'Like count retrieved',
    `Feed with ID ${feed_id} not found. Can't get like count`
  );
};

const feedService = require("../service/feedService");

const snsAppResponse = (res, promise, successMessage, notFoundMessage) => {
  promise
    .then((result) => {
      if (result) {
        res.status(200).json({ message: successMessage, result });
      } else {
        res.status(404).json({ message: notFoundMessage });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: `Error: ${error.message}` });
    });
};

// 피드 생성
exports.createFeed = (req, res) => {
  const { user_id, description } = req.body;
  snsAppResponse(
    res,
    feedService.createFeed(user_id, description),
    "Feed created",
    "Failed to create feed"
  );
};

// 피드 단일 조회
exports.getFeedById = (req, res) => {
  const { feed_id } = req.params;
  snsAppResponse(
    res,
    feedService.getFeedById(feed_id),
    "Feed retrieved",
    `Feed with ID ${feed_id} not found. Can't get`
  );
};

// 모든 피드 조회
exports.getAllFeeds = (req, res) => {
  snsAppResponse(
    res,
    feedService.getAllFeeds(),
    "Feeds retrieved",
    "No feeds available"
  );
};

// 피드 수정
exports.updateFeed = (req, res) => {
  const { feed_id } = req.params;
  const { user_id, description } = req.body;
  snsAppResponse(
    res,
    feedService.updateFeed(feed_id, user_id, description),
    "Feed updated",
    `Feed with ID ${feed_id} not found. Can't update`
  );
};

// 피드 삭제
exports.deleteFeed = (req, res) => {
  const { feed_id } = req.params;
  const { user_id } = req.body;
  snsAppResponse(
    res,
    feedService.deleteFeed(feed_id, user_id),
    "Feed deleted",
    `Feed with ID ${feed_id} not found. Can't delete`
  );
};

// 피드 좋아요 누르기
exports.likeFeed = (req, res) => {
  const { feed_id } = req.params;
  const { user_id } = req.body;
  snsAppResponse(
    res,
    feedService.likeFeed(user_id, feed_id),
    "Feed liked",
    `Feed with ID ${feed_id} not found for liking`
  );
};

// 피드 좋아요 취소
exports.unlikeFeed = (req, res) => {
  const { feed_id } = req.params;
  const { user_id } = req.body;
  snsAppResponse(
    res,
    feedService.unlikeFeed(user_id, feed_id),
    "Feed unliked",
    `Feed with ID ${feed_id} not found. Can't unlike`
  );
};

// 피드 좋아요 상태 확인 (나의 좋아요)
exports.checkLikeStatus = (req, res) => {
  const { feed_id } = req.params;
  const { user_id } = req.body;
  snsAppResponse(
    res,
    feedService.checkLikeStatus(user_id, feed_id),
    "Like status retrieved",
    `Feed with ID ${feed_id} not found. Can't check like status`
  );
};

// 피드 좋아요 갯수 확인
exports.getLikeCount = (req, res) => {
  const { feed_id } = req.params;
  snsAppResponse(
    res,
    feedService.getLikeCount(feed_id),
    "Like count retrieved",
    `Feed with ID ${feed_id} not found. Can't get like count`
  );
};

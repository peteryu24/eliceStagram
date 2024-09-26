const feedModel = require("../model/feedModel");

// 피드 생성
exports.createFeed = async (user_id, description) => {
  try {
    const feedId = await feedModel.createFeed(user_id, description);
    return feedId;
  } catch (error) {
    throw new Error("Error creating feed: " + error.message);
  }
};

// 단일 피드 조회
exports.getFeedById = async (feed_id) => {
  try {
    const feed = await feedModel.getFeedById(feed_id);
    return feed;
  } catch (error) {
    throw new Error("Error retrieving feed: " + error.message);
  }
};

// 모든 피드 조회
exports.getAllFeeds = async () => {
  try {
    const feeds = await feedModel.getAllFeeds();
    return feeds;
  } catch (error) {
    throw new Error("Error retrieving feeds: " + error.message);
  }
};

// 피드 수정
exports.updateFeed = async (feed_id, description) => {
  try {
    const updatedFeed = await feedModel.updateFeed(feed_id, description);
    return updatedFeed;
  } catch (error) {
    throw new Error("Error updating feed: " + error.message);
  }
};

// 피드 삭제
exports.deleteFeed = async (feed_id) => {
  try {
    const deleted = await feedModel.deleteFeed(feed_id);
    return deleted;
  } catch (error) {
    throw new Error("Error deleting feed: " + error.message);
  }
};

// 피드 좋아요 누르기
exports.likeFeed = async (user_id, feed_id) => {
  const existingLike = await feedModel.checkLikeStatus(user_id, feed_id);

  if (existingLike) {
    throw new Error("already liked this feed");
  }

  await feedModel.likeFeed(user_id, feed_id);
  await feedModel.incrementLikeCount(feed_id);
  return true;
};

// 피드 좋아요 취소
exports.unlikeFeed = async (user_id, feed_id) => {
  const existingLike = await feedModel.checkLikeStatus(user_id, feed_id);

  if (!existingLike) {
    throw new Error("not liked this feed before");
  }

  await feedModel.unlikeFeed(user_id, feed_id);
  await feedModel.decrementLikeCount(feed_id); // 좋아요 카운트 감소
  return true;
};

// 피드 좋아요 상태 확인
exports.checkLikeStatus = async (user_id, feed_id) => {
  const liked = await feedModel.checkLikeStatus(user_id, feed_id);
  return liked;
};

// 피드 좋아요 갯수 확인
exports.getLikeCount = async (feed_id) => {
  const likeCount = await feedModel.getLikeCount(feed_id);
  return likeCount;
};

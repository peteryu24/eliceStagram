const feedModel = require("../model/feedModel");

// 공통 에러 처리 함수
const handleError = (action, error) => {
  throw new Error(`Error ${action}: ${error.message}`);
};

// 공통 좋아요 처리 함수
const processLike = async (user_id, feed_id, likeAction) => {
  const existingLike = await feedModel.checkLikeStatus(user_id, feed_id);

  if (likeAction === "like") {
    if (existingLike) throw new Error("Already liked this feed");
    await feedModel.likeFeed(user_id, feed_id);
    await feedModel.incrementLikeCount(feed_id);
  } else if (likeAction === "unlike") {
    if (!existingLike) throw new Error("Not liked this feed before");
    await feedModel.unlikeFeed(user_id, feed_id);
    await feedModel.decrementLikeCount(feed_id);
  }

  return true;
};

// 피드 생성
exports.createFeed = async (user_id, description) => {
  try {
    const feedId = await feedModel.createFeed(user_id, description);
    return feedId;
  } catch (error) {
    handleError("creating feed", error);
  }
};

// 단일 피드 조회
exports.getFeedById = async (feed_id) => {
  try {
    return await feedModel.getFeedById(feed_id);
  } catch (error) {
    handleError("retrieving feed", error);
  }
};

// 모든 피드 조회
exports.getAllFeeds = async () => {
  try {
    return await feedModel.getAllFeeds();
  } catch (error) {
    handleError("retrieving feeds", error);
  }
};

// 피드 수정 (권한 체크)
exports.updateFeed = async (feed_id, user_id, description) => {
  try {
    const feed = await feedModel.getFeedById(feed_id);
    if (feed.user_id !== user_id) {
      throw new Error("Permission denied");
    }
    return await feedModel.updateFeed(feed_id, description);
  } catch (error) {
    handleError("updating feed", error);
  }
};

// 피드 삭제 (권한 체크)
exports.deleteFeed = async (feed_id, user_id) => {
  try {
    const feed = await feedModel.getFeedById(feed_id);
    if (feed.user_id !== user_id) {
      throw new Error("Permission denied");
    }
    return await feedModel.deleteFeed(feed_id);
  } catch (error) {
    handleError("deleting feed", error);
  }
};

// 피드 좋아요 누르기
exports.likeFeed = async (user_id, feed_id) => {
  return processLike(user_id, feed_id, "like");
};

// 피드 좋아요 취소 (권한 체크)
exports.unlikeFeed = async (user_id, feed_id) => {
  const existingLike = await feedModel.checkLikeStatus(user_id, feed_id);
  if (!existingLike) {
    throw new Error("Didn't like this feed before, cannot unlike.");
  }
  return processLike(user_id, feed_id, "unlike");
};

// 피드 좋아요 상태 확인
exports.checkLikeStatus = async (user_id, feed_id) => {
  return await feedModel.checkLikeStatus(user_id, feed_id);
};

// 피드 좋아요 갯수 확인
exports.getLikeCount = async (feed_id) => {
  return await feedModel.getLikeCount(feed_id);
};

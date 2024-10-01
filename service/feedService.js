const feedModel = require('../model/feedModel');

// 공통 에러 처리 함수
const handleError = (action, error) => {
  console.error(`Error ${action}: ${error.message}`);
  throw new Error(error.message);
};

// 피드 생성
exports.createFeed = async (firebase_uid, description, imageUrls) => {
  try {
    const feedId = await feedModel.createFeed(firebase_uid, description);
    
    if (imageUrls && imageUrls.length > 0) {
      await feedModel.addFeedImages(feedId, imageUrls);
    }

    return feedId;
  } catch (error) {
    handleError('creating feed', error);
  }
};


// 단일 피드 조회
exports.getFeedById = async (feed_id) => {
  try {
    return await feedModel.getFeedById(feed_id.trim());
  } catch (error) {
    handleError('retrieving feed', error);
  }
};

// 모든 피드 조회
exports.getAllFeeds = async () => {
  try {
    return await feedModel.getAllFeeds();
  } catch (error) {
    handleError('retrieving feeds', error);
  }
};

// 피드 수정 (권한 체크)
exports.updateFeed = async (feed_id, firebase_uid, description) => {
  try {
    feed_id = feed_id.trim();
    const feed = await feedModel.getFeedById(feed_id);

    if (!feed) {
      throw new Error('Feed not found');
    }
    if (feed.firebase_uid !== firebase_uid) {
      throw new Error('Permission denied');
    }

    return await feedModel.updateFeed(feed_id, description);
  } catch (error) {
    handleError('updating feed', error);
  }
};

// 피드 삭제 (권한 체크)
exports.deleteFeed = async (feed_id, firebase_uid) => {
  try {
    feed_id = feed_id.trim();
    const feed = await feedModel.getFeedById(feed_id);

    if (!feed) {
      throw new Error('Feed not found');
    }
    if (feed.firebase_uid !== firebase_uid) {
      throw new Error('Permission denied');
    }

    return await feedModel.deleteFeed(feed_id);
  } catch (error) {
    handleError('deleting feed', error);
  }
};

// 피드 이미지 수정
exports.updateFeedImage = async (firebase_uid, feed_id, image_id, newImageUrl) => {
  try {
    const feed = await feedModel.getFeedById(feed_id);

    if (!feed || feed.firebase_uid !== firebase_uid) {
      throw new Error('Permission denied');
    }

    return await feedModel.updateFeedImage(feed_id, image_id, newImageUrl);
  } catch (error) {
    handleError('updating feed image', error);
  }
};

// 피드 이미지 삭제
exports.deleteFeedImage = async (firebase_uid, feed_id, image_id) => {
  try {
    const feed = await feedModel.getFeedById(feed_id);

    if (!feed || feed.firebase_uid !== firebase_uid) {
      throw new Error('Permission denied');
    }

    const imageCount = await feedModel.getFeedImageCount(feed_id);
    if (imageCount <= 1) {
      throw new Error('Can\'t delete last image, need at least one image');
    }

    return await feedModel.deleteFeedImage(feed_id, image_id);
  } catch (error) {
    handleError('deleting feed image', error);
  }
};


// 피드 좋아요 누르기
exports.likeFeed = async (firebase_uid, feed_id) => {
  try {
    feed_id = feed_id.trim();
    const feed = await feedModel.getFeedById(feed_id);

    if (!feed) {
      throw new Error('Feed not found');
    }

    const alreadyLiked = await feedModel.checkLikeStatus(firebase_uid, feed_id);
    if (alreadyLiked) {
      throw new Error('Already liked this feed');
    }

    return await feedModel.likeFeed(firebase_uid, feed_id);
  } catch (error) {
    handleError('liking feed', error);
  }
};

// 피드 좋아요 취소 (이미 취소된 경우 처리)
exports.unlikeFeed = async (firebase_uid, feed_id) => {
  try {
    feed_id = feed_id.trim();
    const feed = await feedModel.getFeedById(feed_id);

    if (!feed) {
      throw new Error('Feed not found');
    }

    const alreadyLiked = await feedModel.checkLikeStatus(firebase_uid, feed_id);
    if (!alreadyLiked) {
      throw new Error('Not liked this feed before, cannot unlike');
    }

    return await feedModel.unlikeFeed(firebase_uid, feed_id);
  } catch (error) {
    handleError('unliking feed', error);
  }
};

// 피드 좋아요 상태 확인
exports.checkLikeStatus = async (firebase_uid, feed_id) => {
  try {
    feed_id = feed_id.trim();
    const feed = await feedModel.getFeedById(feed_id);

    if (!feed) {
      throw new Error('Feed not found');
    }

    return await feedModel.checkLikeStatus(firebase_uid, feed_id);
  } catch (error) {
    handleError('checking like status', error);
  }
};

// 피드 좋아요 갯수 확인
exports.getLikeCount = async (feed_id) => {
  try {
    feed_id = feed_id.trim();
    const feed = await feedModel.getFeedById(feed_id);

    if (!feed) {
      throw new Error('Feed not found');
    }

    return await feedModel.getLikeCount(feed_id);
  } catch (error) {
    handleError('getting like count', error);
  }
};

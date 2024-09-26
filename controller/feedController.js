const feedService = require("../service/feedService");

// 피드 생성
exports.createFeed = async (req, res) => {
  const { user_id, description } = req.body;

  try {
    const feedId = await feedService.createFeed(user_id, description);
    res.status(201).json({ message: "Feed created", feedId });
  } catch (error) {
    res.status(500).json({ message: "Error creating feed", error: error.message });
  }
};

// 피드 단일 조회
exports.getFeedById = async (req, res) => {
  const { feed_id } = req.params;

  try {
    const feed = await feedService.getFeedById(feed_id);
    if (feed) {
      res.status(200).json(feed);
    } else {
      res.status(404).json({ message: "Feed not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving single feed by ID", error: error.message });
  }
};

// 모든 피드 조회
exports.getAllFeeds = async (req, res) => {
  try {
    const feeds = await feedService.getAllFeeds();
    res.status(200).json(feeds);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving feeds", error: error.message });
  }
};

// 피드 수정
exports.updateFeed = async (req, res) => {
  const { feed_id } = req.params;
  const { description } = req.body;

  try {
    const updatedFeed = await feedService.updateFeed(feed_id, description);
    if (updatedFeed) {
      res.status(200).json({ message: "Feed updated" });
    } else {
      res.status(404).json({ message: "Feed not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating feed", error: error.message });
  }
};

// 피드 삭제
exports.deleteFeed = async (req, res) => {
  const { feed_id } = req.params;

  try {
    const deleted = await feedService.deleteFeed(feed_id);
    if (deleted) {
      res.status(200).json({ message: "Feed deleted" });
    } else {
      res.status(404).json({ message: "Feed not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting feed", error: error.message });
  }
};

// 피드 좋아요 누르기
exports.likeFeed = async (req, res) => {
  const { feed_id } = req.params;
  const { user_id } = req.body;

  try {
    const liked = await feedService.likeFeed(user_id, feed_id);
    res.status(200).json({ message: "Feed liked", likeStatus: liked });
  } catch (error) {
    res.status(500).json({ message: "Error liking feed", error: error.message });
  }
};

// 피드 좋아요 취소
exports.unlikeFeed = async (req, res) => {
  const { feed_id } = req.params;
  const { user_id } = req.body;

  try {
    const unliked = await feedService.unlikeFeed(user_id, feed_id);
    res.status(200).json({ message: "Feed unliked", likeStatus: unliked });
  } catch (error) {
    res.status(500).json({ message: "Error unliking feed", error: error.message });
  }
};

// 피드 좋아요 상태 확인 (나의 좋아요)
exports.checkLikeStatus = async (req, res) => {
  const { feed_id } = req.params;
  const { user_id } = req.body;

  try {
    const liked = await feedService.checkLikeStatus(user_id, feed_id);
    res.status(200).json({ liked });
  } catch (error) {
    res.status(500).json({ message: "Error checking like status", error: error.message });
  }
};

// 피드 좋아요 갯수 확인
exports.getLikeCount = async (req, res) => {
  const { feed_id } = req.params;

  try {
    const likeCount = await feedService.getLikeCount(feed_id);
    res.status(200).json({ like_count: likeCount });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving like cnt", error: error.message });
  }
};

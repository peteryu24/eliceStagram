const express = require('express');
const feedController = require('../controller/feedController');
const authMiddleware = require('../config/authMiddleware');
const uuidMiddleware = require('../config/uuidMiddleware');

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/feed:
 *   post:
 *     summary: Create a new feed
 *     description: Create a new feed for the user
 *     tags:
 *       - Feed
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: The description of the feed
 *                 example: "A beautiful sunset!"
 *               imageUrls:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of image URLs
 *                 example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *     responses:
 *       201:
 *         description: Feed created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Feed created"
 *                 result:
 *                   type: object
 *                   description: Details of the created feed
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
router.post('/', feedController.createFeed);

/**
 * @swagger
 * /api/feed/{feed_id}:
 *   get:
 *     summary: Get a feed by ID
 *     tags:
 *       - Feed
 *     parameters:
 *       - in: path
 *         name: feed_id
 *         required: true
 *         description: ID of the feed
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved feed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Feed retrieved"
 *                 result:
 *                   type: object
 *                   description: Details of the feed
 *       400:
 *         description: Invalid feed_id format
 *       404:
 *         description: Feed not found
 *       500:
 *         description: Server error
 */
router.get('/:feed_id', uuidMiddleware('feed_id'), feedController.getFeedById);

/**
 * @swagger
 * /api/feed:
 *   get:
 *     summary: Get all feeds
 *     description: Retrieve all feeds
 *     tags:
 *       - Feed
 *     responses:
 *       200:
 *         description: Successfully retrieved all feeds
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Feeds retrieved"
 *                 result:
 *                   type: array
 *                   description: Array of feeds
 *       500:
 *         description: Server error
 */
router.get('/', feedController.getAllFeeds);

/**
 * @swagger
 * /api/feed/{feed_id}:
 *   put:
 *     summary: Update a feed by ID
 *     tags:
 *       - Feed
 *     parameters:
 *       - in: path
 *         name: feed_id
 *         required: true
 *         description: ID of the feed to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Updated description of the feed
 *                 example: "Updated feed description"
 *     responses:
 *       200:
 *         description: Feed updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Feed updated"
 *       400:
 *         description: Invalid feed_id format
 *       404:
 *         description: Feed not found
 *       500:
 *         description: Server error
 */
router.put('/:feed_id', uuidMiddleware('feed_id'), feedController.updateFeed);

/**
 * @swagger
 * /api/feed/{feed_id}:
 *   delete:
 *     summary: Delete a feed by ID
 *     tags:
 *       - Feed
 *     parameters:
 *       - in: path
 *         name: feed_id
 *         required: true
 *         description: ID of the feed to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Feed deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Feed deleted"
 *       400:
 *         description: Invalid feed_id format
 *       404:
 *         description: Feed not found
 *       500:
 *         description: Server error
 */
router.delete('/:feed_id', uuidMiddleware('feed_id'), feedController.deleteFeed);

/**
 * @swagger
 * /api/feed/{feed_id}/like:
 *   post:
 *     summary: Add a like to a feed
 *     tags:
 *       - Feed
 *     parameters:
 *       - in: path
 *         name: feed_id
 *         required: true
 *         description: ID of the feed to like
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Like added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Feed liked"
 *       400:
 *         description: Invalid feed_id format
 *       404:
 *         description: Feed not found
 *       500:
 *         description: Server error
 */
router.post('/:feed_id/like', uuidMiddleware('feed_id'), feedController.likeFeed);

/**
 * @swagger
 * /api/feed/{feed_id}/like:
 *   delete:
 *     summary: Remove a like from a feed
 *     tags:
 *       - Feed
 *     parameters:
 *       - in: path
 *         name: feed_id
 *         required: true
 *         description: ID of the feed to unlike
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Like removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Feed unliked"
 *       400:
 *         description: Invalid feed_id format
 *       404:
 *         description: Feed not found
 *       500:
 *         description: Server error
 */
router.delete('/:feed_id/like', uuidMiddleware('feed_id'), feedController.unlikeFeed);

/**
 * @swagger
 * /api/feed/{feed_id}/like/status:
 *   get:
 *     summary: Check like status for a feed
 *     tags:
 *       - Feed
 *     parameters:
 *       - in: path
 *         name: feed_id
 *         required: true
 *         description: ID of the feed to check like status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Like status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Like status retrieved"
 *                 result:
 *                   type: boolean
 *                   description: Whether the user has liked the feed
 *       400:
 *         description: Invalid feed_id format
 *       404:
 *         description: Feed not found
 *       500:
 *         description: Server error
 */
router.get('/:feed_id/like/status', uuidMiddleware('feed_id'), feedController.checkLikeStatus);

/**
 * @swagger
 * /api/feed/{feed_id}/like/count:
 *   get:
 *     summary: Get the like count for a feed
 *     tags:
 *       - Feed
 *     parameters:
 *       - in: path
 *         name: feed_id
 *         required: true
 *         description: ID of the feed to get like count
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Like count retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Like count retrieved"
 *                 result:
 *                   type: integer
 *                   description: Number of likes
 *       400:
 *         description: Invalid feed_id format
 *       404:
 *         description: Feed not found
 *       500:
 *         description: Server error
 */
router.get('/:feed_id/like/count', uuidMiddleware('feed_id'), feedController.getLikeCount);

module.exports = router;

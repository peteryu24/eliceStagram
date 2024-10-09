const express = require('express');
const commentController = require('../controller/commentController');
const testAuthMiddleware = require('../config/testAuthMiddleware');
const uuidMiddleware = require('../config/uuidMiddleware');

const router = express.Router();

router.use(testAuthMiddleware);

/**
 * @swagger
 * /api/comment/{feed_id}:
 *   post:
 *     summary: Create a comment on a feed
 *     tags:
 *       - Comment
 *     parameters:
 *       - in: path
 *         name: feed_id
 *         required: true
 *         description: ID of the feed
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
 *                 description: The comment content
 *                 example: "This is a great post!"
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment created"
 *                 result:
 *                   type: object
 *       400:
 *         description: Invalid feed_id format or bad request data
 *       404:
 *         description: Feed not found
 *       500:
 *         description: Server error
 */
router.post('/:feed_id', uuidMiddleware('feed_id'), commentController.createComment);

/**
 * @swagger
 * /api/comment/{comment_id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags:
 *       - Comment
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         description: ID of the comment
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment retrieved"
 *                 result:
 *                   type: object
 *       400:
 *         description: Invalid comment_id format
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
router.get('/:comment_id', uuidMiddleware('comment_id'), commentController.getCommentById);

/**
 * @swagger
 * /api/comment/feed/{feed_id}:
 *   get:
 *     summary: Get all comments for a feed
 *     tags:
 *       - Comment
 *     parameters:
 *       - in: path
 *         name: feed_id
 *         required: true
 *         description: ID of the feed to get comments for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved all comments for the feed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comments retrieved"
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Invalid feed_id format
 *       404:
 *         description: No comments found for the feed
 *       500:
 *         description: Server error
 */
router.get('/feed/:feed_id', uuidMiddleware('feed_id'), commentController.getAllCommentsByFeedId);

/**
 * @swagger
 * /api/comment/{comment_id}:
 *   put:
 *     summary: Update a comment by ID
 *     tags:
 *       - Comment
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         description: ID of the comment to update
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
 *                 description: The updated comment content
 *                 example: "This is the updated comment"
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment updated"
 *       400:
 *         description: Invalid comment_id format
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
router.put('/:comment_id', uuidMiddleware('comment_id'), commentController.updateComment);

/**
 * @swagger
 * /api/comment/{comment_id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags:
 *       - Comment
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         description: ID of the comment to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment deleted"
 *       400:
 *         description: Invalid comment_id format
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
router.delete('/:comment_id', uuidMiddleware('comment_id'), commentController.deleteComment);

/**
 * @swagger
 * /api/comment/{comment_id}/like:
 *   post:
 *     summary: Add a like to a comment
 *     tags:
 *       - Comment
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         description: ID of the comment to like
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
 *                   example: "Comment liked"
 *       400:
 *         description: Invalid comment_id format
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
router.post('/:comment_id/like', uuidMiddleware('comment_id'), commentController.likeComment);

/**
 * @swagger
 * /api/comment/{comment_id}/like:
 *   delete:
 *     summary: Remove a like from a comment
 *     tags:
 *       - Comment
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         description: ID of the comment to unlike
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
 *                   example: "Comment unliked"
 *       400:
 *         description: Invalid comment_id format
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
router.delete('/:comment_id/like', uuidMiddleware('comment_id'), commentController.unlikeComment);

/**
 * @swagger
 * /api/comment/{comment_id}/like/status:
 *   get:
 *     summary: Check like status for a comment
 *     tags:
 *       - Comment
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         description: ID of the comment to check like status
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
 *                   description: True if the comment is liked
 *       400:
 *         description: Invalid comment_id format
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
router.get('/:comment_id/like/status', uuidMiddleware('comment_id'), commentController.checkCommentLikeStatus);

/**
 * @swagger
 * /api/comment/{comment_id}/like/count:
 *   get:
 *     summary: Get the like count for a comment
 *     tags:
 *       - Comment
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         description: ID of the comment to get like count
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
 *         description: Invalid comment_id format
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
router.get('/:comment_id/like/count', uuidMiddleware('comment_id'), commentController.getCommentLikeCount);

module.exports = router;

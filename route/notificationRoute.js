const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notificationController');
const authMiddleware = require('../config/authMiddleware'); 

router.use(authMiddleware);

/**
 * @swagger
 * /api/notification:
 *   post:
 *     summary: Create a new notification
 *     description: Create a notification for a user
 *     tags:
 *       - Notification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiver_id:
 *                 type: string
 *                 description: UUID of the receiver
 *               actor_id:
 *                 type: string
 *                 description: UUID of the actor performing the action
 *               target_id:
 *                 type: string
 *                 description: UUID of the target (e.g., post, comment)
 *               target_type:
 *                 type: integer
 *                 description: Type of the target (e.g., post, comment)
 *                 example: 11
 *               notification_type:
 *                 type: integer
 *                 description: Type of notification (e.g., like, comment)
 *                 example: 111
 *     responses:
 *       201:
 *         description: Notification created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notification created"
 *                 result:
 *                   type: object
 *       400:
 *         description: Invalid UUID format
 *       500:
 *         description: Server error
 */
router.post('/', notificationController.createNotification);

/**
 * @swagger
 * /api/notification/{receiver_id}:
 *   get:
 *     summary: Get all notifications for a user
 *     tags:
 *       - Notification
 *     parameters:
 *       - in: path
 *         name: receiver_id
 *         required: true
 *         description: UUID of the user receiving notifications
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notifications retrieved"
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Invalid UUID format
 *       404:
 *         description: No notifications found
 *       500:
 *         description: Server error
 */
router.get('/:receiver_id', notificationController.getNotificationsByUserId);

/**
 * @swagger
 * /api/notification/{notification_id}/read:
 *   put:
 *     summary: Mark a notification as read
 *     tags:
 *       - Notification
 *     parameters:
 *       - in: path
 *         name: notification_id
 *         required: true
 *         description: UUID of the notification to mark as read
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification marked as read
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notification marked as read"
 *       400:
 *         description: Invalid UUID format
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Server error
 */
router.put('/:notification_id/read', notificationController.markAsRead);

/**
 * @swagger
 * /api/notification/{notification_id}:
 *   delete:
 *     summary: Delete a notification
 *     tags:
 *       - Notification
 *     parameters:
 *       - in: path
 *         name: notification_id
 *         required: true
 *         description: UUID of the notification to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notification deleted"
 *       400:
 *         description: Invalid UUID format
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Server error
 */
router.delete('/:notification_id', notificationController.deleteNotification);

module.exports = router;

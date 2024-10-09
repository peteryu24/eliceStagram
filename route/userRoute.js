const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authMiddleware = require('../config/authMiddleware'); 

// 인증 미들웨어 추가
router.use(authMiddleware);

/**
 * @swagger
 * /api/user/updateProfile:
 *   post:
 *     summary: Update user profile
 *     description: Updates the authenticated user's profile information.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The new username for the user
 *                 example: "john_doe"
 *               profileImageUrl:
 *                 type: string
 *                 description: URL of the new profile image
 *                 example: "https://example.com/profile.jpg"
 *     responses:
 *       200:
 *         description: User auth handled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User auth handled successfully."
 *       400:
 *         description: Bad request, invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data"
 *       401:
 *         description: Unauthorized, missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Server Error: An unexpected error occurred"
 */
router.post('/updateProfile', userController.handleUserAuth);

module.exports = router;

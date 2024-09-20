// userRoute.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// 사용자 추가 경로
router.post('/add', userController.addUser);

// 모든 사용자 조회 경로
router.get('/all', userController.getAllUsers);

module.exports = router;

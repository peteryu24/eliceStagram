const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authMiddleware = require('../config/authMiddleware'); 

router.use(authMiddleware);

router.post('/updateProfile', userController.handleUserAuth);

module.exports = router;

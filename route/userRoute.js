const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/updateProfile', userController.handleUserAuth);

module.exports = router;

// userController.js
const userService = require('../services/userService');

// 사용자 추가 요청 처리
exports.addUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    console.log(req.body);
    const userId = await userService.addUser(name, email);
    res.status(200).send(`User added with ID: ${userId}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// 모든 사용자 조회 요청 처리
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

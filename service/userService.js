// userService.js
const userModel = require('../model/userModel');

// 사용자 추가 서비스
exports.addUser = async (name, email) => {
  try {
    const userId = await userModel.addUser(name, email);
    return userId;
  } catch (error) {
    throw new Error('Failed to add user');
  }
};

// 모든 사용자 조회 서비스
exports.getAllUsers = async () => {
  try {
    const users = await userModel.getAllUsers();
    return users;
  } catch (error) {
    throw new Error('Failed to retrieve users');
  }
};

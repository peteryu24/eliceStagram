const admin = require('../config/firebaseAdmin');
const userModel = require('../model/userModel');

exports.handleUserAuth = async (nickname, profileImageUrl, firebase_uid, decodedToken) => {
  try {
    const email = decodedToken.email || '';

    const existingUser = await userModel.getUserByFirebaseUid(firebase_uid);

    if (existingUser) {
      await userModel.updateUser(firebase_uid, nickname, profileImageUrl);
    } else {
      await userModel.createUser(firebase_uid, email, nickname, profileImageUrl);
    }
  } catch (error) {
    throw new Error('Failed to handle user auth: ' + error.message);
  }
};

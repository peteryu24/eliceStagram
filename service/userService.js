const admin = require('../config/firebaseAdmin');
const userModel = require('../model/userModel');

exports.handleUserAuth = async (username, profileImageUrl, firebase_uid, decodedToken) => {  
  try {
    const email = decodedToken.email || '';

    const existingUser = await userModel.getUserByFirebaseUid(firebase_uid);

    if (existingUser) {
      await userModel.updateUser(firebase_uid, username, profileImageUrl);  
    } else {
      await userModel.createUser(firebase_uid, email, username, profileImageUrl);  
    }
  } catch (error) {
    throw new Error('Failed to handle user auth: ' + error.message);
  }
};

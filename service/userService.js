const firebaseAdmin = require('../config/firebase');
const userModel = require('../model/userModel');

exports.handleUserAuth = async (nickname, profileImageUrl, token) => {
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    const firebaseUid = decodedToken.uid;        // Firebase UID
    const email = decodedToken.email;            // 토큰에서 이메일 추출

    await userModel.upsertUserProfile(firebaseUid, email, nickname, profileImageUrl);
  } catch (error) {
    throw new Error('User auth handling failed: ' + error.message);
  }
};


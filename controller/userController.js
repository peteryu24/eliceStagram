const userService = require('../service/userService');

exports.handleUserAuth = async (req, res) => {
  const { username, profileImageUrl } = req.body;  
  const firebase_uid = req.firebase_uid;
  const decodedToken = req.decodedToken;

  try {
    await userService.handleUserAuth(username, profileImageUrl, firebase_uid, decodedToken);  
    res.status(200).send('User auth handled successfully.');
  } catch (error) {
    console.error('Error handling user auth:', error);
    res.status(500).send('Server Error: ' + error.message);
  }
};

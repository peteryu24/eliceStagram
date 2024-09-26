const userService = require('../service/userService');

exports.handleUserAuth = async (req, res) => {
  const { nickname, token, profileImageUrl } = req.body; // email은 token에서 추출

  try {
    await userService.handleUserAuth(nickname, profileImageUrl, token);
    res.status(200).send('User auth handled successfully.');
  } catch (error) {
    res.status(500).send('Server Error: ' + error.message);
  }
};

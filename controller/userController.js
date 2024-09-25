const userService = require('../service/userService');

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

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const newUserService = require('../services/newUser.service');

const registerNewUser = async (req, res) => {
  const token = await newUserService.registerNewUser(req.body);

  res.status(201).json({ token });
};

module.exports = {
  registerNewUser,
};
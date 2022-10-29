const userService = require('../services/user.service');

const registerNewUser = async (req, res) => {
  const token = await userService.registerNewUser(req.body);

  res.status(201).json({ token });
};

const getAllUsers = async (_req, res) => {
  const data = await userService.getAllUsers();

  res.status(200).json(data);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const data = await userService.getUserById(id);

  res.status(200).json(data);
};

module.exports = {
  registerNewUser,
  getAllUsers,
  getUserById,
};
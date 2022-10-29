const { User } = require('../models');
const jwt = require('../utils/jwt.handler');

const registerNewUser = async (data) => {
  const { email } = data;
  const userAlreadyRegistered = await User.findOne({ where: { email } });

  if (userAlreadyRegistered) {
    const error = new Error('User already registered');
    error.status = 409;
    throw error;
  }

  const newUser = await User.create(data);

  const { password, ...dataWithoutPassword } = newUser.dataValues;
  const token = jwt.createToken(dataWithoutPassword);

  return token;
};

const getAllUsers = async () => User.findAll({ 
  attributes: ['id', 'displayName', 'email', 'image'],
});

const getUserById = async (id) => {
  const validUser = await User.findByPk(id);

  if (validUser) {
    const result = await User.findOne({ 
      where: { id },
      attributes: ['id', 'displayName', 'email', 'image'],
    });
  
    return result;
  }

  const error = new Error('User does not exist');
  error.status = 404;
  throw error;
};

module.exports = {
  registerNewUser,
  getAllUsers,
  getUserById,
};
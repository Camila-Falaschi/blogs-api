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

const getAllUsers = async () => {
  const result = await User.findAll();
  
  const allUsersData = result.reduce((acc, element) => {
    const { password, createdAt, updatedAt, ...info } = element.dataValues;
    return [...acc, info];
  }, []);

  return allUsersData;
};

module.exports = {
  registerNewUser,
  getAllUsers,
};
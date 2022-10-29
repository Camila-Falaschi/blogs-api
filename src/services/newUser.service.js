const { User } = require('../models');
const jwt = require('../utils/jwt.generate');

const registerNewUser = async (data) => {
  const { email } = data;
  const userAlreadyRegistered = await User.findOne({ where: { email } });

  if (userAlreadyRegistered) {
    const error = new Error('User already registered');
    error.status = 409;
    throw error;
  }

  const newUser = await User.create(data);

  const { password: _, ...dataWithoutPassword } = newUser.dataValues;
  const token = jwt.createToken(dataWithoutPassword);

  return token;
};

module.exports = {
  registerNewUser,
};
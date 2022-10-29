const { User } = require('../models');
const jwt = require('../utils/jwt.handler');

const validateLogin = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    const error = new Error('Invalid fields');
    error.status = 400;
    throw error;
  }

  const { password: _, ...dataWithoutPassword } = user.dataValues;

  const token = jwt.createToken(dataWithoutPassword);

  return token;
};

module.exports = {
  validateLogin,
};
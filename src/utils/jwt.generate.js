require('dotenv/config');
const jwt = require('jsonwebtoken');

// The 'trybe_course' project, developed in the Node.js classes from Trybe, was consulted to write this file.

const createToken = (data) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

const validateToken = (token) => {
  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (_e) {
    const error = new Error('Invalid Token');
    throw error;
  }
};

module.exports = {
  createToken,
  validateToken,
};
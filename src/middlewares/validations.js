const jwt = require('../utils/jwt.generate');
const { loginSchema, newUserSchema } = require('../utils/schemas');

const validateLogin = (req, _res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    const err = new Error('Some required fields are missing');
    err.status = 400;
    throw err;
  }

  next();
};

const validateNewUserValues = (req, res, next) => {
  const { error } = newUserSchema.validate(req.body);

  if (error) {
    const err = new Error(error.message);
    err.status = 400;
    throw err;
  }

  next();
};

const validateToken = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    const error = new Error('Token is required');
    throw error;
  }

  const token = jwt.validateToken(authorization);
console.log(token);
  next();
};

module.exports = {
  validateLogin,
  validateNewUserValues,
  validateToken,
};
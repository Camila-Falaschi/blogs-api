const jwt = require('../utils/jwt.handler');
const { loginSchema, newUserSchema, categorySchema } = require('../utils/schemas');

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
    const error = new Error('Token not found');
    error.status = 401;
    throw error;
  }

  const user = jwt.validateToken(authorization);
  req.user = user;

  next();
};

const validateCategory = (req, _res, next) => {
  const { error } = categorySchema.validate(req.body);

  if (error) {
    const err = new Error(error.message);
    err.status = 400;
    throw err;
  }

  next();
};

module.exports = {
  validateLogin,
  validateNewUserValues,
  validateToken,
  validateCategory,
};
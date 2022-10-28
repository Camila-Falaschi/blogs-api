const express = require('express');

const loginController = require('../controllers/login.controller');
const { validateLogin } = require('../middlewares/validations');

const routers = express.Router();

routers.post('/', validateLogin, loginController.login);

module.exports = routers;
const express = require('express');

const newUserController = require('../controllers/newUser.controller');
const { validateNewUserValues } = require('../middlewares/validations');

const routers = express.Router();

routers.post('/', validateNewUserValues, newUserController.registerNewUser);

module.exports = routers;
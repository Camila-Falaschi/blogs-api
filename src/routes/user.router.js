const express = require('express');

const userController = require('../controllers/user.controller');
const { validateNewUserValues, validateToken } = require('../middlewares/validations');

const routers = express.Router();

routers.post('/', validateNewUserValues, userController.registerNewUser);

routers.use(validateToken);

routers.get('/', userController.getAllUsers);
routers.get('/:id', userController.getUserById);

module.exports = routers;
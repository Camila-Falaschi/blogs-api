const express = require('express');

const loginRouter = require('./login.router');
const registerNewUserRouter = require('./registerNewUser.router');

const routers = express.Router();

routers.use('/login', loginRouter);

routers.use('/user', registerNewUserRouter);

module.exports = routers;
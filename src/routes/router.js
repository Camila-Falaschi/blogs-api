const express = require('express');

const loginRouter = require('./login.router');
const userRouter = require('./user.router');

const routers = express.Router();

routers.use('/login', loginRouter);

routers.use('/user', userRouter);

module.exports = routers;
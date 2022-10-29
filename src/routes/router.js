const express = require('express');

const loginRouter = require('./login.router');
const userRouter = require('./user.router');
const categoriesRouter = require('./categories.router');

const routers = express.Router();

routers.use('/login', loginRouter);

routers.use('/user', userRouter);

routers.use('/categories', categoriesRouter);

module.exports = routers;
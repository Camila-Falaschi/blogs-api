const express = require('express');

const categoriesController = require('../controllers/categories.controller');
const { validateToken, validateCategory } = require('../middlewares/validations');

const routers = express.Router();

routers.use(validateToken);

routers.post('/', validateCategory, categoriesController.registerNewCategory);

module.exports = routers;
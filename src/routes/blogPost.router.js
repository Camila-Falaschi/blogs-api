const express = require('express');

const blogPostController = require('../controllers/blogPost.controller');
const { validateBlogPostValues, validateToken } = require('../middlewares/validations');

const routers = express.Router();

routers.use(validateToken);

routers.post('/', validateBlogPostValues, blogPostController.addNewBlogPost);

module.exports = routers;
const express = require('express');

const blogPostController = require('../controllers/blogPost.controller');
const { validateBlogPostValues, validateToken,
  validatePostChanges } = require('../middlewares/validations');

const routers = express.Router();

routers.use(validateToken);

routers.post('/', validateBlogPostValues, blogPostController.addNewBlogPost);
routers.get('/', blogPostController.getAllBlogPost);

routers.put('/:id', validatePostChanges, blogPostController.updateBlogPost);
routers.get('/:id', blogPostController.getBlogPostById);

module.exports = routers;
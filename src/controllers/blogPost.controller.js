const blogPostService = require('../services/blogPost.service');

const addNewBlogPost = async (req, res) => {
  const { id } = req.user;

  const result = await blogPostService.addNewBlogPost(id, req.body);

  res.status(201).json(result);
};

const getAllBlogPost = async (req, res) => {
  const { id } = req.user;

  const result = await blogPostService.getAllBlogPost(id);

  res.status(200).json(result);
};

module.exports = {
  addNewBlogPost,
  getAllBlogPost,
};
const blogPostService = require('../services/blogPost.service');

const addNewBlogPost = async (req, res) => {
  const { id } = req.user;

  const result = await blogPostService.addNewBlogPost(id, req.body);
  // console.log(result);
  res.status(201).json(result);
};

module.exports = {
  addNewBlogPost,
};
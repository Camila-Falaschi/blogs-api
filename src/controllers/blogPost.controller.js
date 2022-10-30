const blogPostService = require('../services/blogPost.service');

const addNewBlogPost = async (req, res) => {
  const { id } = req.user;

  const result = await blogPostService.addNewBlogPost(id, req.body);

  return res.status(201).json(result);
};

const getAllBlogPost = async (req, res) => {
  const { id } = req.user;

  const result = await blogPostService.getAllBlogPost(id);

  return res.status(200).json(result);
};

const getBlogPostById = async (req, res) => {
  const { id: userId } = req.user;
  const { id: postId } = req.params;

  const result = await blogPostService.getBlogPostById(userId, postId);

  if (!result || result.length === 0) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(...result);
};

const updateBlogPost = async (req, res) => {
  const { id: userId } = req.user;
  const { id: postId } = req.params;

  const result = await blogPostService.updateBlogPost(userId, postId, req.body);

  return res.status(200).json(result);
};

module.exports = {
  addNewBlogPost,
  getAllBlogPost,
  getBlogPostById,
  updateBlogPost,
};
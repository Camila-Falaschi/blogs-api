const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

// To write the Sequelize configuration in this file was consulted the 'ORM - Associations N:N e Transactions' class from Trybe.

const validateId = async (categoryIds) => {
  const arrayIds = categoryIds.reduce((acc, number) => [...acc, { id: number }], []);
  const { count } = await Category.findAndCountAll({ where: { [Op.or]: arrayIds } });

  if (count !== arrayIds.length) {
    const error = new Error('one or more "categoryIds" not found');
    error.status = 400;
    return error;
  }
};

const addNewBlogPost = async (userId, { title, content, categoryIds }) => {
  const error = await validateId(categoryIds);
  if (error) throw error;

  try {
    const result = await sequelize.transaction(async (t) => {
      const blogPost = await BlogPost.create({ title, content, userId }, { transaction: t });
      
      const arrayIds = categoryIds.reduce((acc, id) => 
        [...acc, { postId: blogPost.id, categoryId: id }], []);

      await PostCategory.bulkCreate(arrayIds, { transaction: t });

      return blogPost;
    });
    return result;
  } catch (err) {
    err.status = 500;
    throw err;
  }
};

const getAllBlogPost = async (userId) => BlogPost.findAll({
  where: { userId },
  include: [
    { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const getBlogPostById = async (userId, postId) => BlogPost.findAll({
  where: { id: postId, userId },
  include: [
    { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const updateBlogPost = async (userId, postId, changedPostData) => {
  const verifyUser = await BlogPost.findOne({ where: { id: postId, userId } });
  if (!verifyUser) {
    const error = new Error('Unauthorized user');
    error.status = 401;
    throw error;
  }

  await BlogPost.update({ ...changedPostData }, { where: { id: postId, userId } });

  const post = await BlogPost.findOne({
    where: { id: postId, userId },
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return post;
};

module.exports = {
  addNewBlogPost,
  getAllBlogPost,
  getBlogPostById,
  updateBlogPost,
};
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { BlogPost, PostCategory, Category } = require('../models');
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

module.exports = {
  addNewBlogPost,
};
const { Category } = require('../models');

const registerNewCategory = async (name) => Category.create(name);

const getAllCategories = async () => Category.findAll();

module.exports = {
  registerNewCategory,
  getAllCategories,
};
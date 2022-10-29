const { Category } = require('../models');

const registerNewCategory = async (name) => Category.create(name);

module.exports = {
  registerNewCategory,
};
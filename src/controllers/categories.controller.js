const categoriesService = require('../services/categories.service');

const registerNewCategory = async (req, res) => {
  const result = await categoriesService.registerNewCategory(req.body);
  
  return res.status(201).json(result);
};

const getAllCategories = async (_req, res) => {
  const result = await categoriesService.getAllCategories();
  
  return res.status(200).json(result);  
};

module.exports = {
  registerNewCategory,
  getAllCategories,
};
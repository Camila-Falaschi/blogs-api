const categoriesService = require('../services/categories.service');

const registerNewCategory = async (req, res) => {
  const result = await categoriesService.registerNewCategory(req.body);
  
  res.status(201).json(result);
};

module.exports = {
  registerNewCategory,
};
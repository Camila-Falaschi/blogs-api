const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const newUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().allow(null, ''),
});

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const blogPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number().integer().min(1)).required(),
});

const updatePostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

module.exports = {
  loginSchema,
  newUserSchema,
  categorySchema,
  blogPostSchema,
  updatePostSchema,
};
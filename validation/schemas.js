// validation/schemas.js
const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
  subscription: Joi.string().valid("starter", "pro", "business").optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = { registerSchema, loginSchema, emailSchema };

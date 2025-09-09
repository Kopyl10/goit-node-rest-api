// schemas/contactsSchemas.js
const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().trim().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string().email(),
  phone: Joi.string().trim(),
}).min(1);

module.exports = { addSchema, updateSchema };

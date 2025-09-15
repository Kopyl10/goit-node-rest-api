// schemas/contacts.js
const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
}).min(1);

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
};

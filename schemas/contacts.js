// schemas/contacts.js
const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email(),
  phone: Joi.string().min(3),
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(1),
  email: Joi.string().email(),
  phone: Joi.string().min(3),
  favorite: Joi.boolean(),
}).min(1);

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
    "boolean.base": "missing field favorite",
  }),
});

module.exports = {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
};

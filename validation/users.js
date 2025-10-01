const Joi = require("joi");

const resendEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

function validateResendEmail(req, res, next) {
  const { error } = resendEmailSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
}

module.exports = { validateResendEmail };

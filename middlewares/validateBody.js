// middlewares/validateBody.js
module.exports = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message:
        error.details?.[0]?.message ||
        "Помилка від Joi або іншої бібліотеки валідації",
    });
  }
  next();
};

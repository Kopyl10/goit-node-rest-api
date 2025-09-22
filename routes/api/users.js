const express = require("express");
const router = express.Router();

const { register, login } = require("../../controllers/authController");
const validateBody = require("../../middlewares/validateBody");
const { registerSchema, loginSchema } = require("../../schemas/authSchemas");

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

module.exports = router;

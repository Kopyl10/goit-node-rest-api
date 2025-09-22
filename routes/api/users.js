const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  getCurrent,
} = require("../../controllers/authController");
const validateBody = require("../../middlewares/validateBody");
const { registerSchema, loginSchema } = require("../../schemas/authSchemas");
const auth = require("../../middlewares/auth");

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);

router.get("/current", auth, getCurrent);

module.exports = router;

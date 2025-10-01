const express = require("express");
const router = express.Router();

const {
  verifyEmail,
  resendVerificationEmail,
  register,
  login: loginAuth,
} = require("../../controllers/authController");

const validateBody = require("../../middlewares/validateBody");
const {
  registerSchema,
  loginSchema,
  emailSchema,
} = require("../../validation/schemas");

const { updateAvatar } = require("../../controllers/users");

const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

function requireEmailField(req, res, next) {
  if (!req.body || typeof req.body.email === "undefined") {
    return res.status(400).json({ message: "missing required field email" });
  }
  next();
}

router.post("/signup", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), loginAuth);

router.get("/current", auth, (req, res) => {
  const { email, subscription, avatarURL } = req.user;
  res.json({ email, subscription, avatarURL });
});

router.patch("/avatar", auth, upload.single("avatar"), updateAvatar);

router.get("/verify/:verificationToken", verifyEmail);
router.post(
  "/verify",
  requireEmailField,
  validateBody(emailSchema),
  resendVerificationEmail
);

module.exports = router;

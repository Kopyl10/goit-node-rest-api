const express = require("express");
const router = express.Router();

const {
  verifyEmail,
  resendVerificationEmail,
  register,
  login: loginAuth,
} = require("../../controllers/authController");
const { validateResendEmail } = require("../../validation/users");

const { updateAvatar } = require("../../controllers/users");
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

router.post("/signup", register);
router.post("/login", loginAuth);
router.get("/current", auth, (req, res) => {
  const { email, subscription, avatarURL } = req.user;
  res.json({ email, subscription, avatarURL });
});

router.patch("/avatar", auth, upload.single("avatar"), updateAvatar);
router.get("/verify/:verificationToken", verifyEmail);

router.post("/verify", validateResendEmail, resendVerificationEmail);

module.exports = router;

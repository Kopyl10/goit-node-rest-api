const express = require("express");
const router = express.Router();

const { signup, login, updateAvatar } = require("../../controllers/users");
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

router.post("/signup", signup);
router.post("/login", login);
router.get("/current", auth, (req, res) => {
  const { email, subscription, avatarURL } = req.user;
  res.json({ email, subscription, avatarURL });
});

router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

module.exports = router;

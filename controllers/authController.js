const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const { JWT_SECRET = "dev-secret", JWT_EXPIRES_IN = "24h" } = process.env;

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ message: "Email or password is wrong" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok)
    return res.status(401).json({ message: "Email or password is wrong" });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  user.token = token;
  await user.save();

  return res.status(200).json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
}
async function logout(req, res) {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  return res.status(204).send();
}

async function getCurrent(req, res) {
  const { email, subscription } = req.user;
  return res.status(200).json({ email, subscription });
}

module.exports = { login, logout, getCurrent };

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { nanoid } = require("nanoid");
const { sendVerificationEmail } = require("../services/emailService");

const { JWT_SECRET = "dev-secret", JWT_EXPIRES_IN = "24h" } = process.env;

async function register(req, res) {
  const { email, password, subscription } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: "Email in use" });
  }

  const hash = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const user = await User.create({
    email,
    password: hash,
    subscription: subscription || "starter",
    token: null,
    verify: false,
    verificationToken,
  });

  try {
    await sendVerificationEmail(email, verificationToken);
  } catch (e) {
    console.error(
      "Send verification email failed:",
      e?.response?.body || e.message
    );
  }

  return res.status(201).json({
    user: { email: user.email, subscription: user.subscription },
    message: "User created. Verification email sent.",
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ message: "Email or password is wrong" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok)
    return res.status(401).json({ message: "Email or password is wrong" });

  if (!user.verify) {
    return res.status(401).json({ message: "Email is not verified" });
  }

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
async function verifyEmail(req, res) {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.verify = true;
  user.verificationToken = null;
  await user.save();

  return res.status(200).json({ message: "Verification successful" });
}
async function resendVerificationEmail(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  if (!user.verificationToken) {
    user.verificationToken = nanoid();
    await user.save();
  }

  await sendVerificationEmail(user.email, user.verificationToken);

  return res.status(200).json({ message: "Verification email sent" });
}

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  verifyEmail,
  resendVerificationEmail,
};

// controllers/users.js
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const avatarsDir = path.join(process.cwd(), "public", "avatars");

const signup = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;

    const avatarURL = gravatar.url(email, {
      s: "250",
      d: "identicon",
      protocol: "https",
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      subscription,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tmpPath } = req.file;

    const image = await Jimp.read(tmpPath);
    await image.cover(250, 250).writeAsync(tmpPath);

    const filename = `${_id}_${Date.now()}.jpg`;
    const finalPath = path.join(avatarsDir, filename);

    await fs.rename(tmpPath, finalPath);

    const avatarURL = `/avatars/${filename}`;

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (err) {
    next(err);
  }
};
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

// --- LOGIN ---
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "23h" });
    user.token = token;
    await user.save();

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  login, // 👈 add this
  updateAvatar,
};

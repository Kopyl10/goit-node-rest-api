// middlewares/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { JWT_SECRET = "dev-secret" } = process.env;

module.exports = async function auth(req, res, next) {
  try {
    const { authorization = "" } = req.headers;
    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await User.findById(decoded.id);
    if (!user || user.token !== token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

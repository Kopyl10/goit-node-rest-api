const multer = require("multer");
const path = require("path");
const fs = require("fs");

const tmpDir = path.join(process.cwd(), "tmp");
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const limits = { fileSize: 2 * 1024 * 1024 };
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (!allowed.includes(file.mimetype)) {
    const err = new Error("Only image files are allowed");
    err.status = 400;
    return cb(err);
  }
  cb(null, true);
};

const upload = multer({ storage, limits, fileFilter });

module.exports = upload;

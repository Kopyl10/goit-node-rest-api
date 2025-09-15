// server.js
require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const { MONGODB_URI, PORT = 3000 } = process.env;

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Database connection successful");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1);
  }
})();

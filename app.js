// app.js
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
console.log("loaded app.js from:", __filename);
const contactsRouter = require("./routes/api/contacts.js");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));
app.get("/", (req, res) => res.json({ ok: true, service: "contacts-api" }));
app.use("/api/contacts", contactsRouter);

app.use((req, res) => res.status(404).json({ message: "Not found" }));

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Server error" });
});

module.exports = app;

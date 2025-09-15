// models/contact.js
const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "Set name for contact"] },
    email: String,
    phone: String,
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("Contact", contactSchema);

// controllers/contacts.js
const mongoose = require("mongoose");
const Contact = require("../models/contact");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (e) {
    next(e);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!isValidId(contactId))
      return res.status(404).json({ message: "Not found" });
    const doc = await Contact.findById(contactId);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (e) {
    next(e);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    const doc = await Contact.create(req.body);
    res.status(201).json(doc);
  } catch (e) {
    next(e);
  }
};

exports.updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!isValidId(contactId))
      return res.status(404).json({ message: "Not found" });
    const updated = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (e) {
    next(e);
  }
};

exports.removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!isValidId(contactId))
      return res.status(404).json({ message: "Not found" });
    const removed = await Contact.findByIdAndDelete(contactId);
    if (!removed) return res.status(404).json({ message: "Not found" });
    res.json({ message: "contact deleted" });
  } catch (e) {
    next(e);
  }
};

exports.updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!isValidId(contactId))
      return res.status(404).json({ message: "Not found" });

    const { favorite } = req.body ?? {};
    if (typeof favorite === "undefined") {
      return res.status(400).json({ message: "missing field favorite" });
    }

    const updated = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: !!favorite },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (e) {
    next(e);
  }
};

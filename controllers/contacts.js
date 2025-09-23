// controllers/contacts.js
const mongoose = require("mongoose");
const Contact = require("../models/contact");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const contacts = await Contact.find({ owner });
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

    const { _id: owner } = req.user;
    const doc = await Contact.findOne({ _id: contactId, owner });
    if (!doc) return res.status(404).json({ message: "Not found" });

    res.json(doc);
  } catch (e) {
    next(e);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const doc = await Contact.create({ ...req.body, owner });
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

    const { _id: owner } = req.user;
    const updated = await Contact.findOneAndUpdate(
      { _id: contactId, owner },
      req.body,
      { new: true }
    );

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

    const { _id: owner } = req.user;
    const removed = await Contact.findOneAndDelete({ _id: contactId, owner });

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

    const { _id: owner } = req.user;
    const updated = await Contact.findOneAndUpdate(
      { _id: contactId, owner },
      { favorite: !!favorite },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (e) {
    next(e);
  }
};

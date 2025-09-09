// controllers/contactsControllers.js
const svc = require("../services/contactsServices");
const HttpError = require("../helpers/HttpError");

const getAllContacts = async (req, res, next) => {
  try {
    res.json(await svc.listContacts());
  } catch (e) {
    next(e);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const contact = await svc.getContactById(req.params.id);
    if (!contact) throw HttpError(404, "Not Found");
    res.json(contact);
  } catch (e) {
    next(e);
  }
};

const createContact = async (req, res, next) => {
  try {
    const created = await svc.addContact(req.body);
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const updated = await svc.updateContact(req.params.id, req.body);
    if (!updated) throw HttpError(404, "Not Found");
    res.json(updated);
  } catch (e) {
    next(e);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const removed = await svc.removeContact(req.params.id);
    if (!removed) throw HttpError(404, "Not Found");
    res.json({ message: "contact deleted" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
};

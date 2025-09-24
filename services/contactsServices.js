// services/contactServices.js
const Contact = require("../models/contact");

async function getAllContacts({ owner }) {
  return Contact.find({ owner });
}

async function getContactById(id, owner) {
  return Contact.findOne({ _id: id, owner });
}

async function createContact(data) {
  return Contact.create(data);
}

async function deleteContact(id, owner) {
  return Contact.findOneAndDelete({ _id: id, owner });
}

async function updateContact(id, body, owner) {
  return Contact.findOneAndUpdate({ _id: id, owner }, body, { new: true });
}

async function updateStatusContact(id, favorite, owner) {
  return Contact.findOneAndUpdate(
    { _id: id, owner },
    { favorite },
    { new: true }
  );
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};

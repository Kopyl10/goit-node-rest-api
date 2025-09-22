// services/contactServices.js
import Contact from "../models/contact.js";

export async function getAllContacts({ owner }) {
  return Contact.find({ owner });
}

export async function getContactById(id, owner) {
  return Contact.findOne({ _id: id, owner });
}

export async function createContact(data) {
  return Contact.create(data);
}

export async function deleteContact(id, owner) {
  return Contact.findOneAndDelete({ _id: id, owner });
}

export async function updateContact(id, body, owner) {
  return Contact.findOneAndUpdate({ _id: id, owner }, body, { new: true });
}

export async function updateStatusContact(id, favorite, owner) {
  return Contact.findOneAndUpdate(
    { _id: id, owner },
    { favorite },
    { new: true }
  );
}

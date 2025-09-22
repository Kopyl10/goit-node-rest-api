// controllers/contactsController.js
import * as contactsService from "../services/contactServices.js";

export async function listContacts(req, res, next) {
  try {
    const { _id: owner } = req.user;
    const items = await contactsService.getAllContacts({ owner });
    res.json(items);
  } catch (e) {
    next(e);
  }
}

export async function getContact(req, res, next) {
  try {
    const { _id: owner } = req.user;
    const item = await contactsService.getContactById(req.params.id, owner);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    next(e);
  }
}

export async function addContact(req, res, next) {
  try {
    const { _id: owner } = req.user;
    const item = await contactsService.createContact({ ...req.body, owner });
    res.status(201).json(item);
  } catch (e) {
    next(e);
  }
}

export async function removeContact(req, res, next) {
  try {
    const { _id: owner } = req.user;
    const item = await contactsService.deleteContact(req.params.id, owner);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json({ message: "contact deleted" });
  } catch (e) {
    next(e);
  }
}

export async function updateContact(req, res, next) {
  try {
    const { _id: owner } = req.user;
    const item = await contactsService.updateContact(
      req.params.id,
      req.body,
      owner
    );
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    next(e);
  }
}

export async function updateStatusContact(req, res, next) {
  try {
    const { _id: owner } = req.user;
    const item = await contactsService.updateStatusContact(
      req.params.id,
      req.body.favorite,
      owner
    );
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) {
    next(e);
  }
}

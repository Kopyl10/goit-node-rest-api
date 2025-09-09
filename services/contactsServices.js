// services/contactsServices.js
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

const read = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data || "[]");
  } catch (e) {
    if (e.code === "ENOENT") return [];
    throw e;
  }
};

const write = async (data) => {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
};

async function listContacts() {
  return await read();
}

async function getContactById(id) {
  const all = await read();
  return all.find((c) => c.id === String(id)) || null;
}

async function removeContact(id) {
  const all = await read();
  const idx = all.findIndex((c) => c.id === String(id));
  if (idx === -1) return null;
  const [removed] = all.splice(idx, 1);
  await write(all);
  return removed;
}

async function addContact({ name, email, phone }) {
  const all = await read();
  const contact = { id: nanoid(), name, email, phone };
  all.push(contact);
  await write(all);
  return contact;
}

async function updateContact(id, patch) {
  const all = await read();
  const idx = all.findIndex((c) => c.id === String(id));
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...patch };
  await write(all);
  return all[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

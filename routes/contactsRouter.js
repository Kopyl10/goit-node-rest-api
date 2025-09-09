// routes/contactsRouter.js
const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/contactsControllers");
const { validateBody } = require("../helpers/validateBody");
const { addSchema, updateSchema } = require("../schemas/contactsSchemas");

router.get("/", ctrl.getAllContacts);
router.get("/:id", ctrl.getOneContact);
router.post("/", validateBody(addSchema), ctrl.createContact);
router.put("/:id", validateBody(addSchema), ctrl.updateContact);
router.patch("/:id", validateBody(updateSchema), ctrl.updateContact);
router.delete("/:id", ctrl.deleteContact);

module.exports = router;

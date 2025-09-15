const express = require("express");
const ctrl = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);
router.get("/:contactId", ctrl.getById);
router.post("/", validateBody(createContactSchema), ctrl.createOne);
router.put("/:contactId", validateBody(updateContactSchema), ctrl.updateById);
router.delete("/:contactId", ctrl.removeById);
router.patch(
  "/:contactId/favorite",
  validateBody(updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;

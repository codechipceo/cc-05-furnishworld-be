const { validateRequestBody } = require("../../validators/Validation.js");
const contactCtrl = require("./contactCtrl.js");

const router = require("express").Router();

router.get("/", contactCtrl.getAll);
router.post("/", validateRequestBody, contactCtrl.create);
router.delete("/:id", contactCtrl.delete);

const contactRouter = router;

module.exports = { contactRouter };

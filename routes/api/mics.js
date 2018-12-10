const router = require("express").Router();
const micsController = require("../../controllers/micsController");

router.route("/").get(micsController.findAll);

router.route("/:id").get(micsController.findById);

module.exports = router;

const router = require("express").Router();
const micsController = require("../../controllers/micsController");

router.route("/").get(micsController.findAll);

module.exports = router;

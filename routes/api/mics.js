const router = require("express").Router();
const micsController = require("../../controllers/micsController");

router
  .route("/")
  .get(micsController.findAll)
  .post(micsController.create);

router.route("/:id").get(micsController.findById);

module.exports = router;

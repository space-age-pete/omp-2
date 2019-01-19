const router = require("express").Router();
const exampleRoutes = require("./mics");

router.use("/", exampleRoutes);

module.exports = router;

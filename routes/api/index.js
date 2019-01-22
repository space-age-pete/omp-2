const router = require("express").Router();
const micRoutes = require("./mics");
const userRoutes = require("./users");

router.use("/mics", micRoutes);
router.use("/users", userRoutes);

module.exports = router;

const router = require("express").Router()
const exampleRoutes = require("./mics")

router.use("/mics", exampleRoutes)

module.exports = router

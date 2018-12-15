const router = require("express").Router();
const micsController = require("../../controllers/micsController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { filesize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
});

router
  .route("/")
  .get(micsController.findAll)
  .post(upload.single("micImage"), micsController.create);
//.post(micsController.create);

router.route("/:id").get(micsController.findById);

module.exports = router;

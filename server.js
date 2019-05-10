const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const session = require("express-session");
const passport = require("./config");
//var multer = require("multer");
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use("/uploads", express.static("uploads"));

// Sessions
app.use(
  session({
    secret: "fraggle-rock", //pick a random string to make the hash that is generated secure
    resave: false, //required
    saveUninitialized: false //required
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

// Routes
app.use(routes);

// app.use(
//   multer({
//     dest: "./uploads/",
//     rename: function(fieldname, filename) {
//       return filename;
//     }
//   })
// );

// app.post("/api/photo", function(req, res) {
//   var newItem = new Item();
//   newItem.img.data = fs.readFileSync(req.files.userPhoto.path);
//   newItem.img.contentType = "image/png";
//   newItem.save();
// });

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/openmiclist");

app.listen(PORT, function() {
  console.log(`API Server now listening on PORT ${PORT}!`);
});

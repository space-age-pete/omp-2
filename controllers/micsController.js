const db = require("../models");

// Defining methods for the micsController
module.exports = {
  findAll: function(req, res) {
    //console.log("!!!!!!!!!find hit");
    //console.log("req", req.query);
    db.Mic.find(req.query)
      .then(dbModel => {
        //console.log("dbModel", dbModel);

        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Mic.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log(req.file);
    db.Mic.create({ ...req.body, img: req.file.path })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Mic.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Mic.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

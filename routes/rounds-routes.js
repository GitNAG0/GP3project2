var db = require('../models');
const router = require('express').Router()

  //get most recent round, chronological sorted
  router.get("/getLastRound/:id", function (req, res) {
    db.Round.findOne({where: {CompanieID: req.params.id}}).then(function (dbRound) {
      res.json(dbRound);
      //temporary hack until i figure out date sorting
    });
  });

  // Find all rounds and return them to the user with res.json
  router.get("/rounds", function(req, res) {
    db.Round.findAll().then(function(dbRound) {
      res.json(dbRound);
    });
  });

  router.get("/rounds/:id", function(req, res) {
    // Find one Round with the id in req.params.id and return them to the user with res.json
    db.Round.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbRound) {
      res.json(dbRound);
    });
  });

  router.get("/getOneCompanyRounds/:id", function (req, res) {
    // Find one Round with the id in req.params.id and return them to the user with res.json
    db.Round.findAll({
      where: {
        CompanieID: req.params.id
      }
    }).then(function (dbRound) {
      res.json(dbRound);
    });
  });

  router.post("/rounds", function(req, res) {
    // Create an Round with the data available to us in req.body
    console.log(req.body);
    db.Round.create(req.body).then(function(dbRound) {
      res.json(dbRound);
    });
  });

  router.put("/rounds", function(req, res) {
    // Update a Round with the data available to us in req.body
    console.log(req.body);
    db.Round.update(req.body, {where: {id: req.params.id}}
    ).then(function(dbRound) {
      res.json(dbRound);
    });
  });

  router.delete("/rounds/:id", function(req, res) {
    // Delete the Round with the id available to us in req.params.id
    db.Round.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbRound) {
      res.json(dbRound);
    });
  });

module.exports = router

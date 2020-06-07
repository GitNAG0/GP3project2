var db = require('../models');
const router = require('express').Router()

  // Find all companies and return them to the user with res.json
  router.get("/companies", function(req, res) {
    db.Companie.findAll().then(function(dbCompanie) {
      res.json(dbCompanie);
    });
  });

  // Finds all of one users companies, searches by UserId
  router.get("/companies/:id", function(req, res) {
    // Find one Companie with the id in req.params.id and return them to the user with res.json
    db.Companie.findAll({
      where: {
        UserId: req.params.id
      }
    }).then(function(dbCompanie) {
      res.json(dbCompanie);
    });
  });

  router.post("/companies", function(req, res) {
    // Create an Companie with the data available to us in req.body
    console.log(req.body);
    db.Companie.create(req.body).then(function(dbCompanie) {
      res.json(dbCompanie);
    });
  });

  router.put("/companies", function(req, res) {
    // Update a Companie with the data available to us in req.body
    console.log(req.body);
    db.Companie.update(req.body, {where: {id: req.params.id}}
    ).then(function(dbCompanie) {
      res.json(dbCompanie);
    });
  });

  router.delete("/companies/:id", function(req, res) {
    // Delete the Companie with the id available to us in req.params.id
    db.Companie.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbCompanie) {
      res.json(dbCompanie);
    });
  });

module.exports = router

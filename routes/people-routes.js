var db = require('../models');
const router = require('express').Router()

  // Find all people and return them to the user with res.json
  router.get("/people", function(req, res) {
    db.People.findAll().then(function(dbPeople) {
      res.json(dbPeople);
    });
  });

  router.get("/people/:id", function(req, res) {
    // Find one People with the id in req.params.id and return them to the user with res.json
    db.People.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPeople) {
      res.json(dbPeople);
    });
  });

  router.post("/people", function(req, res) {
    // Create an People with the data available to us in req.body
    console.log(req.body);
    db.People.create(req.body).then(function(dbPeople) {
      res.json(dbPeople);
    });
  });

  router.put("/people/:id", function(req, res) {
    // Update a People with the data available to us in req.body
    console.log(req.body);
    db.People.update(req.body, {where: {id: req.params.id}}
    ).then(function(dbPeople) {
      res.json(dbPeople);
    });
  });

  router.delete("/people/:id", function(req, res) {
    // Delete the People with the id available to us in req.params.id
    db.People.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPeople) {
      res.json(dbPeople);
    });
  });

module.exports = router

var db = require('../models');
const router = require('express').Router()

  // Find all users and return them to the user with res.json
  router.get("/users", function(req, res) {
    db.User.findAll().then(function(dbUser) {
      res.json(dbUser);
    });
  });

  router.get("/users/:id", function(req, res) {
    // Find one User with the id in req.params.id and return them to the user with res.json
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  router.post("/users", function(req, res) {
    // Create an User with the data available to us in req.body
    console.log(req.body);
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  router.put("/users", function(req, res) {
    // Update a User with the data available to us in req.body
    console.log(req.body);
    db.User.update(req.body, {where: {id: req.params.id}}
    ).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  router.delete("/users/:id", function(req, res) {
    // Delete the User with the id available to us in req.params.id
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

module.exports = router

const app = require('express').Router();
const db = require('../models');

module.exports = function (app) {
  //GET all  users
  app.get('/users/all', function (req, res) {
    db.Users.findAll({}).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

  //POST api/users/create
  app.post('/users/create', function (req, res) {
    console.log(req.body);
    db.Users.create(req.body).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });
};

const app = require('express').Router();
const db = require('../models');
///getOneCompanyPeople/:company_id
module.exports = function (app) {
  app.get('/OneCompanyPeople/:company_id', function (req, res) {
    db.OneCompanyPeople.findOne({
      where: {
        id: req.params.company_id,
      },
    }).then(function (dbOneCompanyPeople) {
      res.json(dbOneCompanyPeople);
    });
  });
  //Get onePerson By ID
  app.get('/OnePerson/:id', function (req, res) {
    db.OnePerson.findOne({
      where: {
        id: req.params.users_id,
      },
    }).then(function (dbOnePerson) {
      res.json(dbOnePerson);
    });
  });
  //PUT update to person Profile
  app.put('/OnePerson/:id', function (req, res) {
    db.OnePerson.update({
      where: {
        id: req.params.users_id,
      },
    }).then(function (dbOnePerson) {
      res.json(dbOnePerson);
    });
  });
  //POSt CreateOne Person
  app.post('/onePerson', function (req, res) {
    console.log(req.body);
    db.OnePerson.create(req.body).then(function (dbOnePerson) {
      res.json(dbOnePerson);
    });
  });
  //Delete One Person By ID
  app.delete('onePerson/:id', function (req, res) {
    db.OnePerson.destroy({
      where: { id: req.params.users_id },
    }).then(function (dbOnePerson) {
      res.json(dbOnePerson);
    });
  });
};

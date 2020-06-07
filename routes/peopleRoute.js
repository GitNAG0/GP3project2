const app = require('express').Router();
const db = require('../models');
///getOneCompanyPeople/:company_id
module.exports = function (app) {
  app.get('/getOneCompanyPeople/:company_id', function (req, res) {
    db.getOneCompanyPeople.findOne({
      where: {
        id: req.params.company_id,
      },
    }).then(function (dbgetOneCompanyPeople) {
      res.json(dbgetOneCompanyPeople);
    });
  });
  //Get onePerson By ID
  app.get('/getOnePerson/:id', function (req, res) {
    db.getOnePerson.findOne({
      where: {
        id: req.params.users_id,
      },
    }).then(function (dbgetOnePerson) {
      res.json(dbgetOnePerson);
    });
  });
  //PUT update to person Profile
  app.put('/updateOnePerson/:id', function (req, res) {
    db.updateOnePerson.update({
      where: {
        id: req.params.users_id,
      },
    }).then(function (dbgetOnePerson) {
      res.json(dbgetOnePerson);
    });
  });
  //POSt CreateOne Person
  app.post('/createOnePerson', function (req, res) {
    console.log(req.body);
    db.createOnePerson.create(req.body).then(function (dbOnePerson) {
      res.json(dbOnePerson);
    });
  });
  //Delete One Person By ID
  app.delete('deleteOnePerson/:id', function (req, res) {
    db.deleteOnePerson.destroy({
      where: { id: req.params.users_id },
    }).then(function (dbOnePerson) {
      res.json(dbOnePerson);
    });
  });
};

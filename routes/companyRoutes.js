const app = require('express').Router();
const db = require('../models');

//api/getAllCompaniesUser/:user_id
module.exports = function (app) {
  app.get('/getAllCompaniesUser/:user_id', function (res, res) {
    db.AllCompaniesUser.findOne({
      where: {
        id: req.params.user_id,
      },
    }).then(function (dbAllCompaniesUser) {
      res.json(dbAllCompaniesUser);
    });
  });

  app.get('/getOneCompany/:id', function (req, res) {
    db.OneCompany.findOne({
      where: {
        id: req.params.OneCompany_id,
      },
    }).then(function (dbOneCompany) {
      res.json(dbOneCompany);
    });
  });

  app.post('/createOneCompany', function (req, res) {
    console.log(req.body);
    db.OneCompany.create(req.body).then(function (dbOneCompany) {
      res.json(dbOneCompany);
    });
  });

  app.delete('/deleteOneCompany/:id', function (req, res) {
    db.OneCompany.destroy({
      where: {
        id: req.params.OneCompany_id,
      },
    }).then(function (dbOneCompany) {
      res.json(dbOneCompany);
    });
  });

};

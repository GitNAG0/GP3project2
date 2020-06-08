const app = require('express').Router();
const db = require('../models');

module.exports = function (app) {
  app.get('/getLastRound/:company_id', function (req, res) {
    db.getLastRound
      .findOne({
        where: {
          id: req.params.company_id,
        },
      })
      .then(function (dbgetLastRound) {
        res.json(getLastRound);
      });
  });

  app.get('/getOneCompanyRounds/:company_id', function (req, res) {
    db.getOneCompanyRounds
      .findOne({
        where: {
          id: req.params.company_id,
        },
      })
      .then(function (dbgetOneCompanyRounds) {
        res.json(dbgetOneCompanyRounds);
      });
  });

  app.get('/getOneRound/:id', function (req, res) {
    db.getOneCompanyRounds
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then(function (dbgetOneCompanyRounds) {
        res.json(dbgetOneCompanyRounds);
      });
  });

   app.put('/updateOneRound', function (req, res) {
     db.updateOneRound
       .update({
         where: {
           id: req.params.company_id,
         },
       })
       .then(function (dbgetOneCompanyRounds) {
         res.json(dbgetOneCompanyRounds);
       });
   });

   app.post('/createOneRound', function (req, res) {
     console.log(req.body);
     db.createOneRound.create(req.body).then(function (dbgetOneCompanyRounds) {
       res.json(dbgetOneCompanyRounds);
     });
   });

    app.delete('deleteOneRound/:id', function (req, res) {
    db.deleteOneRound.destroy({
      where: { id: req.params.company_id },
    }).then(function (dbgetOneCompanyRounds) {
      res.json(dbgetOneCompanyRounds);
    });
  });
};



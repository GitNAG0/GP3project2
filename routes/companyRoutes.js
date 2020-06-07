const db = require('../models');

//api/getAllCompaniesUser/:user_id
module.exports = function (app) {
  app.get('/api/getAllCompaniesUser/:user_id', function (res, res) {
    db.AllCompaniesUser.findOne({
      where: {
        id: req.params.user_id,
      },
    }).then(function (dbAllCompaniesUser) {
      res.json(dbAllCompaniesUser);
    });
  });

  app.get('/api/onecompany/:id', function (req, res) {
    db.OneCompany.findOne({
      where: {
        id: req.params.OneCompany_id,
      },
    }).then(function (dbOneCompany) {
      res.json(dbOneCompany);
    });
  });

  app.post('/api/createonecompany', function (req, res) {
    console.log(req.body);
    db.OneCompany.create(req.body).then(function (dbOneCompany) {
      res.json(dbOneCompany);
    });
  });

  app.delete('/api/deleteOneCompany/:id', function (req, res) {
    db.OneCompany.destroy({
      where: {
        id: req.params.OneCompany_id,
      },
    }).then(function (dbOneCompany) {
      res.json(dbOneCompany);
    });
  });

};

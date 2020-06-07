module.exports = function (app) {
  //GET all  users
  app.get('/api/users', function (req, res) {
    db.Users.findAll({}).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

  //POST api/users/create
  app.post('/api/users', function (req, res) {
    console.log(req.body);
    db.Users.create(req.body).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });
};

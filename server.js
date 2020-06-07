require('dotenv').config();

//basic test server for building profile page

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const router = require('./routes')

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json())
app.use('/api', router)

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render('info',req.body);
});

app.get('/personForm', function (req,res) {
  res.render('personForm');
});


app.get('/roundForm', function (req, res) {
  res.render('roundForm');
});


app.get('/companyForm', function (req, res) {
  res.render('companyForm');
});

app.get('/screencap', function (req, res) {
  res.render('screencap');
});

var db = require("./models");
var PORT = process.env.PORT || 8080;

// DONT FORGET TO ADD BACK IN
// app.use(require('./routes'))

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
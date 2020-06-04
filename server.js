require('dotenv').config();

//basic test server for building profile page

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render('info',req.body);
});

app.get('/personForm', function (req,res) {
  res.render('personForm')
});


app.get('/roundForm', function (req, res) {
  res.render('roundForm')
});


app.get('/companyForm', function (req, res) {
  res.render('companyForm')
});

app.listen(process.env.PORT, () => console.log('http://localhost:3000'));

var db = require("./models");

app.use(express.json())
var PORT = process.env.PORT || 8080;

// DONT FORGET TO ADD BACK IN
// app.use(require('./routes'))

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
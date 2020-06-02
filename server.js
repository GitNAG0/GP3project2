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
  res.render('info',{companyName: 'Apple Inc.', lastRoundType: 'Series B', lastRoundAmount: 5000000});
});

app.get('/personForm', function (req,res) {
  res.render('personForm')
});


// Isaac Inserted for Database

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

app.listen(process.env.PORT, () => console.log('http://localhost:3000'));
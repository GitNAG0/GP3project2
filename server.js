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

app.listen(process.env.PORT, () => console.log('http://localhost:3000'));
require('dotenv').config()

//basic test server for building profile page

const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const app = express();

app.use(express.static(path.join(__dirname, '/public')))

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render('info',{companyName: 'Apple Inc.', lastRoundType: 'Series B', lastRoundAmount: 5000000});
});

app.listen(process.env.PORT, () => console.log('http://localhost:3000'));
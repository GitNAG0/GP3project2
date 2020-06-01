const router = require('express').Router();
const db = require('../db');

//CompanyRoutes

router.get('/companies', (req, res) => {
  db.query('SELECT * FROM companies', (err, companies) => {
    if (err) {
      console.log(err);
    }
    res.json(companies);
  });
});

//POST
router.post('/companies', (req, res) => {
  db.query('INSERT INTO companies SET?', req.body, err => {
    if (err) {
      console.log(err);
    }
    res.sendStatus(200);
  });
});

module.exports = router;

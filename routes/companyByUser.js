const router = require('express').Router();
const {companyByUser} = require('../models');

//GET all Companies by users
router.get('/companyByUser', (req, res) => {
  CompanyByUser.findAll()
    .then(users => res.json(users))
    .catch(err => console.error(err));
});




const router = require('express').Router()
const { singleCompany, companyByUser } = require('../models');

// GET single company by *****ID or by name?******
router.get('/singleCompany/:id', (req, res) => {
  SingleCompany
    .findOne({ where: { id: req.params.id }, include: [Users] })
    .then(singleCompany => res.json(singleCompany))
    .catch(err => console.error(err));
});

//POST single company
router.post('/users', (req,res)=>{
  User.create(req.body)
  .then(user => res.json(user))
  .catch(err => console.console.error(err))
})

// PUT 
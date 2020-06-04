const router = require('express').Router()
const { singleCompany, companyByUser } = require('../models');

//api/getAllCompaniesUser/:user_id
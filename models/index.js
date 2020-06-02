const companies = require('./companies')
const people = require('./people')
const rounds = require('./rounds')
const users = require('./users')

users.hasMany(companies)

companies.hasMany(people, rounds)

module.exports = { users, companies }

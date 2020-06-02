const { Model, DataTypes } = require('sequelize')
const sequelize = require('../connection')

class companies extends Model { }

companies.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, { sequelize, modelName: 'companies' })

module.exports = companies
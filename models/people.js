const { Model, DataTypes } = require('sequelize')
const sequelize = require('../connection')

class people extends Model { }

people.init({
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },  
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },  
  experience: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, 
{ sequelize, modelName: 'people' })

module.exports = people
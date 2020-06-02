const { Model, DataTypes } = require('sequelize')
const sequelize = require('../connection')

class users extends Model { }

users.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, 
{ sequelize, modelName: 'users' })

module.exports = users
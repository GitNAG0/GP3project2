const { Model, DataTypes } = require('sequelize')
const sequelize = require('../connection')

class rounds extends Model { }

rounds.init({
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },  
  dateRaised: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, { sequelize, modelName: 'rounds' })

module.exports = rounds
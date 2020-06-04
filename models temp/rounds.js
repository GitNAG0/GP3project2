// const { Model, DataTypes } = require('sequelize')
// const sequelize = require('../connection')

// class rounds extends Model { }

// rounds.init({
//   type: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   amount: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },  
//   dateRaised: {
//     type: DataTypes.DATEONLY,
//     allowNull: false
//   }
// }, { sequelize, modelName: 'rounds' })

// module.exports = rounds

// // new


// module.exports = function(sequelize, DataTypes) {
//   var User = sequelize.define("User", {
//     // Giving the Author model a name of type STRING
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   });

//   User.associate = function(models) {
//     // Associating Author with Posts
//     // When an Author is deleted, also delete any associated Posts
//     User.hasMany(models.Companie, {
//     });
//   };

//   return User;
// };

module.exports = function(sequelize, DataTypes) {
    var People = sequelize.define("People", {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
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
    });
  
    People.associate = function(models) {
        People.belongsTo(models.Companie)
    };

    return People;
  };
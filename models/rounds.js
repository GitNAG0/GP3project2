module.exports = function(sequelize, DataTypes) {
    let Round = sequelize.define("Round", {
      // Giving the Author model a name of type STRING
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
    });
  

    Round.associate = function(models) {
        Round.belongsTo(models.Companie)
    };
  
    return Round;
  };
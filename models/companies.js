module.exports = function(sequelize, DataTypes) {
    let Companie = sequelize.define("Companie", {
      companyName: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    // Associating Companie with people and round

    Companie.associate = function(models) {
        Companie.hasMany(models.People, {
            onDelete: "cascade"
        })
    };

    Companie.associate = function(models) {
        Companie.hasMany(models.Round, {
            onDelete: "cascade"
        })
    };
    
    return Companie;
  };
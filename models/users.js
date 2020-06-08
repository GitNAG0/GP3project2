
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Associating User with Posts
  User.associate = function(models) {
    User.hasMany(models.Companie, {
      onDelete: "cascade"
  })
  };

  return User;
};
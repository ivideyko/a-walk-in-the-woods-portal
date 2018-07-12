module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    highscore: {
      type: DataTypes.INTEGER,
      defaultValue: "0"
    }
  });
  return User;
};

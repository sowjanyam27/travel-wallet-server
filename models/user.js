"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  user.associate = function (models) {
    user.belongsToMany(models.trip, {
      through: "usertrips",
      foreignKey: "userId",
    });
    user.belongsToMany(models.expense, {
      through: "userexpenses",
      forienkey: "userId",
    });
  };
  return user;
};

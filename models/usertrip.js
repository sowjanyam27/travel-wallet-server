"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class usertrip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      usertrip.belongsTo(models.user);
      usertrip.belongsTo(models.trip);
    }
  }
  usertrip.init(
    {
      userId: DataTypes.INTEGER,
      tripId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "usertrip",
    }
  );
  return usertrip;
};

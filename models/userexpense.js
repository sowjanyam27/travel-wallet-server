"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userexpense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userexpense.belongsTo(models.user);
      userexpense.belongsTo(models.expense);
    }
  }
  userexpense.init(
    {
      userId: DataTypes.INTEGER,
      expenseId: DataTypes.INTEGER,
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "userexpense",
    }
  );
  return userexpense;
};

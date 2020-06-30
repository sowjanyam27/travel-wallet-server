"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      expense.belongsTo(models.trip);
      expense.hasMany(models.expensetype);
    }
  }
  expense.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "expense",
    }
  );
  return expense;
};

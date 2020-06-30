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
      expenses.belongsTo(models.trip);
      expenses.hasMany(expensetypes);
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

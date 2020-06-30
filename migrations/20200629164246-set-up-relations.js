"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("expenses", "expensetypeId", {
      type: Sequelize.INTEGER,
      references: {
        model: "expensetypes",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("expenses", "expensetypeId");
  },
};

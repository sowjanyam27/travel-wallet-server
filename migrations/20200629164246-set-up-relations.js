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
    await queryInterface.addColumn("expenses", "tripId", {
      type: Sequelize.INTEGER,
      references: {
        model: "trips",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("trips", "image", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("expenses", "expensetypeId");
    await queryInterface.removeColumn("trips", "image");
    await queryInterface.removeColumn("expenses", "tripId");
  },
};

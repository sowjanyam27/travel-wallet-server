"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "trips",
      [
        {
          title: "trip1",
          budget: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "trip2",
          budget: 2000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("trips", null, {});
  },
};

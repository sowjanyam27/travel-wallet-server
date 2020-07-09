"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "expenses",
      [
        {
          title: "lunch",
          amount: 20,
          expensetypeId: 1,
          tripId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("expenses", null, {});
  },
};

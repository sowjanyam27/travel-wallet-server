"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "userexpenses",
      [
        {
          userId: 1,
          expenseId: 1,
          amount: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          expenseId: 2,
          amount: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("userexpenses", null, {});
  },
};

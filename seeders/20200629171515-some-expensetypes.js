"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "expensetypes",
      [
        {
          title: "food",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "travel",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "accomidation",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "shopping",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "other",
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

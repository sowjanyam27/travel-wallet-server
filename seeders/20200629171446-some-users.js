"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          fullname: "test1",
          email: "test1@t.com",
          password: "test1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullname: "test2",
          email: "test2@t.com",
          password: "test2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};

"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "trips",
      [
        {
          title: "Thailand",
          budget: 3000,
          image: "public/2020-07-06T15-54-11.770Zthailand.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Singapore",
          budget: 2000,
          image: "public/2020-07-06T15-54-58.799Zsingapore.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Bali",
          budget: 2000,
          image: "public/2020-07-06T15-55-15.958Zbali.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Cape Town",
          budget: 2000,
          image: "public/2020-07-06T15-55-42.907Zcapetown.jpg",
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

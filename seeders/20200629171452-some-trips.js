"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "trips",
      [
        {
          title: "Paris",
          budget: 1000,
          image:
            "https://www.iata.org/contentassets/4b8ec35d55dd4596a1ee21a75aaab835/paris-330x200.jpg?w=330&h=200&mode=crop&scale=both&v=20190829085556",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Dubai",
          budget: 2000,
          image:
            "https://media.tacdn.com/media/attractions-splice-spp-674x446/09/50/95/e5.jpg",
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

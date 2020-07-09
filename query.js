const Expenses = require("./models").expense;
const ExpenseType = require("./models").expensetype;
const UserTrips = require("./models").usertrip;
const User = require("./models").user;
const UserExpenses = require("./models").userexpense;
const sequelize = require("sequelize");
const Trips = require("./models").trip;
const Op = sequelize.Op;

const getTrips = async (userId) => {
  const trips = await UserTrips.findAll({
    attributes: [
      "tripId",
      [sequelize.fn("COUNT", sequelize.col("tripId")), "n_tripId"],
    ],
    where: { userId },
    include: {
      model: Trips,
      attributes: ["title", "image"],
    },
    group: ["usertrip.tripId", "trip.id"],
  });
  console.log(
    "rows",
    trips.map((row) => row.get({ plain: true }))
  );
};
getTrips(1);

/* const getDetails = async (tripId) => {
  const output = await UserExpenses.findAll({
    attributes: [
      "user.id",
      "user.fullname",
      [sequelize.fn("sum", sequelize.col("userexpense.amount")), "totals"],
    ],
    include: [
      {
        model: User,
        attributes: ["fullname"],
      },
      {
        model: Expenses,
        attributes: [],
        where: { tripId },
      },
    ],
    group: ["user.id", "user.fullname"],
  });
  console.log("output:", output);
};

//getDetails(3);
 */

const getCount = async (ids) => {
  const result = await UserTrips.findAll({
    attributes: [
      "tripId",
      [sequelize.fn("COUNT", sequelize.col("tripId")), "n_tripId"],
    ],
    where: { tripId: { [Op.in]: ids } },
    group: "tripId",
  });
  console.log(
    "rows",
    result.map((row) => row.get({ plain: true }))
  );
};

getCount([1, 2, 3, 4, 5]);

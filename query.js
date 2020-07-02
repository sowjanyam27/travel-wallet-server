const Expenses = require("./models").expense;
const ExpenseType = require("./models").expensetype;
const UserTrips = require("./models").usertrip;
const User = require("./models").user;
const UserExpenses = require("./models").userexpense;
const sequelize = require("sequelize");

const getDetails = async (tripId) => {
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

getDetails(3);

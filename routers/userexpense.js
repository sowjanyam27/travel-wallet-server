const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const router = new Router();
const Expenses = require("../models").expense;
const User = require("../models").user;
const UserExpenses = require("../models").userexpense;
const sequelize = require("sequelize");

//endpoint to get all the users totals for the trip to calculate the summary

router.get("/:tripId", async (request, response, next) => {
  try {
    const { tripId } = request.params;

    const expensesTotal = await UserExpenses.findAll({
      attributes: [
        "user.id",
        "user.fullname",
        [sequelize.fn("sum", sequelize.col("userexpense.amount")), "total"],
      ],
      include: [
        {
          model: User,
          attributes: ["fullname", "email"],
        },
        {
          model: Expenses,
          attributes: [],
          where: { tripId },
        },
      ],
      group: ["user.id", "user.fullname"],
    });

    if (!expensesTotal) {
      response.status(404).send("expensesTotal not found");
    } else {
      response.send(expensesTotal);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;

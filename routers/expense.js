const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const router = new Router();
const Trips = require("../models").trip;
const Expenses = require("../models").expense;
const ExpenseType = require("../models").expensetype;
const UserTrips = require("../models").usertrip;
const User = require("../models").user;
const UserExpenses = require("../models").userexpense;
const sequelize = require("sequelize");

router.post("/:tripId", authMiddleware, async (request, response, next) => {
  try {
    const { tripId } = request.params;
    const { title, amount, expensetypeId, sharedBy, spentBy } = request.body;
    console.log("expensetypeId:", expensetypeId, typeof expensetypeId);

    const numberOfFriends = sharedBy.length || 1;
    if (!tripId || !title || !amount) {
      response.status(400).send("Must provide title and amount for expense");
    } else {
      const newExpense = await Expenses.create({
        title,
        amount,
        expensetypeId,
        tripId,
      });

      if (!sharedBy.includes(spentBy)) {
        const newEntry = await UserExpenses.create({
          expenseId: newExpense.id,
          userId: spentBy,
          amount,
        });
      }

      const userExpensesCreatePromises = sharedBy.map(async (friend) => {
        //console.log(friend);
        let amt = 0;
        if (friend === spentBy) {
          amt = (amount / numberOfFriends) * (numberOfFriends - 1);
        } else {
          amt = -(amount / numberOfFriends);
        }
        await UserExpenses.create({
          expenseId: newExpense.id,
          userId: friend,
          amount: amt,
        });
      });

      await Promise.all(userExpensesCreatePromises);

      const expense = await Expenses.findOne({
        where: { id: newExpense.id },
      });

      response.json(expense);
    }
  } catch (e) {
    next(e);
  }
});

router.get("/:tripId", async (request, response, next) => {
  try {
    const { tripId } = request.params;
    console.log("------tripId:", tripId);
    const expensesTotal = await Expenses.findAll({
      attributes: [
        "expensetypeId",
        [sequelize.fn("sum", sequelize.col("amount")), "total_amount"],
      ],
      where: { tripId },
      group: ["expensetypeId"],
      order: ["expensetypeId"],
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

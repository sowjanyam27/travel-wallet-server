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
const currency = require("currency.js");

//posting the new expense with tripId as param
router.post("/:tripId", authMiddleware, async (request, response, next) => {
  try {
    const { tripId } = request.params;
    const { title, amount, expensetypeId, sharedBy, spentBy } = request.body;
    console.log("expensetypeId:", expensetypeId, typeof expensetypeId);

    const numberOfFriends = sharedBy.length || 1;
    if (!tripId || !title || !amount) {
      response.status(400).send("Must provide title and amount for expense");
    } else {
      //First create an entry in expense table
      const newExpense = await Expenses.create({
        title,
        amount,
        expensetypeId,
        tripId,
      });

      // when the user paid but not part of the shared group
      // creating a row of + full amount in user expense table
      if (!sharedBy.includes(spentBy)) {
        const newEntry = await UserExpenses.create({
          expenseId: newExpense.id,
          userId: spentBy,
          amount,
        });
      }

      //Inserting rows into userexpenses for all the persons who shared the expense
      const userExpensesCreatePromises = sharedBy.map(async (friend) => {
        //console.log(friend);
        let amt = 0;
        // for the user who paid the expense, populate with +(amount) which he gets in return
        if (friend === spentBy) {
          amt = (amount / numberOfFriends) * (numberOfFriends - 1);
        } else {
          //for the users who shared populate with -(amount) which the user has to pay
          amt = -(amount / numberOfFriends);
        }
        await UserExpenses.create({
          expenseId: newExpense.id,
          userId: friend,
          amount: currency(amt),
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

// Get all the expenses for each category to show the statistics
// select expensetypeId , sum(amount)
//  from expenses
//  where tripId = tripId
//  groupBy expensetypeId
//  orderBy expensetypeId
router.get("/:tripId", async (request, response, next) => {
  try {
    const { tripId } = request.params;
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

//delete an expense with expenseId
router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const toDelete = await Expenses.findByPk(id);
    if (!toDelete) {
      res.status(404).send("Expense not found");
    } else {
      const deleted = await toDelete.destroy();
      const toDeleteFromUserExpense = await UserExpenses.findAll({
        where: { expenseId: id },
      });
      if (!toDeleteFromUserExpense) {
        res.status(404).send("Expense not found in UserExpense");
      } else {
        const deletedUserExpenses = toDeleteFromUserExpense.forEach(
          async (user) => await user.destroy()
        );
      }
      res.json(deleted);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;

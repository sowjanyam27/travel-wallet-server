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

router.get("/", async (request, response, next) => {
  try {
    const expenseTypes = await ExpenseType.findAll();
    if (!expenseTypes) {
      response.status(404).send("expenseTypes not found");
    } else {
      response.send(expenseTypes);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;

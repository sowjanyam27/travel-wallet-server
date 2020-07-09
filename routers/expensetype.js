const { Router } = require("express");
const router = new Router();
const ExpenseType = require("../models").expensetype;

//Get all the expenseTypes
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

const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const router = new Router();
const Trips = require("../models").trip;
const Expenses = require("../models").expense;
const ExpenseType = require("../models").expensetype;
const UserTrips = require("../models").usertrip;
const User = require("../models").user;

router.post("/", authMiddleware, async (request, response, next) => {
  try {
    //const { userId } = request.params;
    const { title, budget, image } = request.body;
    if (!title) {
      response.status(400).send("Must provide title for Trip");
    } else {
      const newTrip = await Trips.create({ title, budget, image });
      response.json(newTrip);
    }
  } catch (e) {
    next(e);
  }
});

// All the users for the given tripId
router.get("/:tripId", async (request, response, next) => {
  try {
    const { tripId } = request.params;
    if (!tripId) {
      return response
        .status(400)
        .send({ message: "tripId is not passed in the request" });
    }
    const expenses = await UserTrips.findAll({
      where: { tripId },
      include: [User],
    });
    if (!expenses) {
      response.status(404).send("expenses not found");
    } else {
      response.send(expenses);
    }
  } catch (e) {
    next(e);
  }
});

router.get("/expenses/:tripId", async (request, response, next) => {
  try {
    const { tripId } = request.params;
    if (!tripId) {
      return response
        .status(400)
        .send({ message: "tripId is not passed in the request" });
    }
    const expenses = await Expenses.findAll({
      where: { tripId },
    });
    if (!expenses) {
      response.status(404).send("expenses not found");
    } else {
      response.send(expenses);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;

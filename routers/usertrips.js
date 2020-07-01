const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const router = new Router();
const Trips = require("../models").trip;
const UserTrips = require("../models").usertrip;
const User = require("../models").user;

router.get("/:userId", authMiddleware, async (request, response, next) => {
  try {
    const { userId } = request.params;
    if (!userId) {
      return response
        .status(400)
        .send({ message: "userId is not passed in the body" });
    }
    const trips = await UserTrips.findAll({
      where: { userId },
      include: [Trips],
    });
    if (!trips) {
      response.status(404).send("artworks not found");
    } else {
      response.send(trips);
    }
  } catch (e) {
    next(e);
  }
});

router.post("/:userId", async (request, response, next) => {
  try {
    const { userId } = request.params;
    const { tripId, friends } = request.body;
    if (!userId || !tripId) {
      response
        .status(400)
        .send("Must provide userId and tripId  to insert into userTrips");
    } else {
      const newTrip = await UserTrips.create({ userId, tripId });

      const userTripsCreatePromises = friends.map(async (friend) => {
        console.log(friend);
        await UserTrips.create({ tripId, userId: friend.id });
      });

      await Promise.all(userTripsCreatePromises);

      const trip = await UserTrips.findAll({
        where: { tripId },
        include: [User, Trips],
      });

      response.json(trip);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;

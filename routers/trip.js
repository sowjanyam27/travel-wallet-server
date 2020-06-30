const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const router = new Router();
const Trips = require("../models").trip;
const UserTrips = require("../models").usertrip;

router.get("/:userId", async (request, response, next) => {
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

module.exports = router;

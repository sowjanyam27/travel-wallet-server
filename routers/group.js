const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const router = new Router();
const Trips = require("../models").trip;
const UserTrips = require("../models").usertrip;
const User = require("../models").user;
const sequelize = require("sequelize");
const Op = sequelize.Op;

router.get("/trip", async (request, response, next) => {
  try {
    const { ids } = request.query;

    if (!ids) {
      return response
        .status(400)
        .send({ message: "ids is not passed in the body" });
    }
    const result = await UserTrips.findAll({
      attributes: [
        "tripId",
        [sequelize.fn("COUNT", sequelize.col("tripId")), "n_tripId"],
      ],
      where: { tripId: { [Op.in]: ids } },
      group: ["tripId"],
    });

    if (!result) {
      response.status(404).send("trips not found");
    } else {
      response.send(result);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;

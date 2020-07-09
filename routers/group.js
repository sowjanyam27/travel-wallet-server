const { Router } = require("express");
const router = new Router();
const UserTrips = require("../models").usertrip;
const sequelize = require("sequelize");
const Op = sequelize.Op;

router.get("/trip", async (request, response, next) => {
  try {
    const { ids } = request.query;

    if (!ids) {
      return response
        .status(400)
        .send({ message: "ids is not passed in the query" });
    }
    //select tripId , count(*) from usertrips where tripId in (ids) groupby tripId;
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

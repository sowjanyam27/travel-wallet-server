const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const router = new Router();
const Trips = require("../models").trip;
const Expenses = require("../models").expense;
const ExpenseType = require("../models").expensetype;
const UserTrips = require("../models").usertrip;
const User = require("../models").user;
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

router.post(
  "/",
  authMiddleware,
  upload.single("file"),
  async (request, response, next) => {
    try {
      const {
        file,
        body: { title, amount },
      } = request;

      let image = null;
      if (file) {
        image = request.file.path;
      }
      // console.log("File:", request.file, request.body);

      if (!title) {
        response.status(400).send("Must provide title for Trip");
      } else {
        const newTrip = await Trips.create({
          title,
          budget: amount,
          image: image,
        });
        response.json(newTrip);
      }
    } catch (e) {
      next(e);
    }
  }
);

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

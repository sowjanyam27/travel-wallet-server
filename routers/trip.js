const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const router = new Router();
const Trips = require("../models").trip;
const Expenses = require("../models").expense;
const UserTrips = require("../models").usertrip;
const User = require("../models").user;
const multer = require("multer");

// destination folder public for all the uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

//Filter for only accepting the files which are jpeg and png format
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
  //upload.single("file"),
  async (request, response, next) => {
    try {
      const { title, amount, image } = request;

      // console.log("File:", request.file, request.body);

      if (!title) {
        response.status(400).send("Must provide title for Trip");
      } else {
        const newTrip = await Trips.create({
          title,
          budget: amount,
          image,
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
      include: [User, Trips],
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

//get all the expenses for the trip
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

//delete an expense with expenseId
router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const toDelete = await Trips.findByPk(id);
    if (!toDelete) {
      res.status(404).send("Trip not found");
    } else {
      const deleted = await toDelete.destroy();
      const toDeleteFromExpenses = await Expenses.findAll({
        where: { tripId: id },
      });

      const deletedExpenses = toDeleteFromExpenses.forEach(
        async (user) => await user.destroy()
      );

      const toDeleteFromUserTrip = await UserTrips.findAll({
        where: { tripId: id },
      });
      if (!toDeleteFromUserTrip) {
        res.status(404).send("Trip not found in UserTrip");
      } else {
        const deletedUserTrips = toDeleteFromUserTrip.forEach(
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

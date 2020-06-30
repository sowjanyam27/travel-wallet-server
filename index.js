const express = require("express");
const loggerMiddleWare = require("morgan");
const corsMiddleWare = require("cors");
const { PORT } = require("./config/constants");
const authRouter = require("./routers/auth");
const authMiddleWare = require("./auth/middleware");

const Trips = require("./models").trip;

const app = express();
app.use(loggerMiddleWare("dev"));

const jsonParser = express.json();

app.use(corsMiddleWare());
app.use(jsonParser);

if (process.env.DELAY) {
  app.use((req, res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });
}

app.use("/", authRouter);

/* app.get("/", async (request, response, next) => {
  try {
    const trips = await Trips.findAll();
    if (!trips) {
      response.status(404).send("artworks not found");
    } else {
      response.send(trips);
    }
  } catch (e) {
    next(e);
  }
}); */

app.listen(PORT, () => console.log("server started on ", PORT));

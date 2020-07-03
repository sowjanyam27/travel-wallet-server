require("dotenv").config();

const express = require("express");
const loggerMiddleWare = require("morgan");
const corsMiddleWare = require("cors");
const { PORT } = require("./config/constants");
const authRouter = require("./routers/auth");
const authMiddleWare = require("./auth/middleware");
const tripRouter = require("./routers/trip");
const userRouter = require("./routers/user");
const userTripsRouter = require("./routers/usertrips");
const expenseRouter = require("./routers/expense");
const expenseTypeRouter = require("./routers/expensetype");
const userexpenseRouter = require("./routers/userexpense");
const emailRouter = require("./routers/email");

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
app.use("/user", userRouter);
app.use("/home", userTripsRouter);
app.use("/trip", tripRouter);
app.use("/types", expenseTypeRouter);
app.use("/expense", expenseRouter);
app.use("/userexpense", userexpenseRouter);
app.use("/email", emailRouter);

app.listen(PORT, () => console.log("server started on ", PORT));

require("dotenv").config();
require("express-async-errors");
const express = require("express");

const app = express();

//database module
const connectDatabase = require("./database/connect");

//authentication middleware
const authenticateUser = require('./middlewares/authentication')

// router module
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

// error handlers
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

// test route
// app.get("/", (req, res, next) => {
//   next();
//   res.json({ port: process.env.PORT, msg: "Server is working" });
// });

app.use(express.json());

// main routes
app.use("/auth", authRouter);
app.use("/api/v1", authenticateUser, userRouter);

// using the error handlers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const connectionString = process.env.MONGO_URI;

const start = async () => {
  try {
    await connectDatabase(connectionString);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

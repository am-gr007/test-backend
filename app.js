require("dotenv").config();
require("express-async-errors");
const express = require("express");
const session = require("express-session");
const passport = require("passport");

const app = express();
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

//database module
const connectDatabase = require("./database/connect");

//authentication middleware
const { checkAuthenticated } = require("./middlewares/authentication");

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
app.get("/authenticated", (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});
app.get("/authentication-failed", (req, res) => {
  res.send("something went wrong..");
});
app.use("/api/v1", checkAuthenticated, userRouter);
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy();
    res.send("Goodbye!");
  });
});

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

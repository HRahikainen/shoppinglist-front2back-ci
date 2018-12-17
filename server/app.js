"use strict";

const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const keys = require("./config/keys");
const app = express();
const cors = require("cors");
const errorHandler = require("errorhandler");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
//Set up mongoose connection
const mongoose = require("mongoose");
const mongoDB = keys.MONGO_URI;
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === "production";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "passport-tutorial",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

if (!isProduction) {
  app.use(errorHandler());
}

require("./config/passport");

//if (isProduction) {
app.use(express.static(path.join(__dirname, "public")));
//app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
//}
app.use("/", indexRouter);
app.use("/users", usersRouter);

if (!isProduction) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

module.exports = app;

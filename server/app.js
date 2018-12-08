"use strict";

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
const errorHandler = require("errorhandler");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
//Set up mongoose connection
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/shopping_list"; //mongo:27017/shopping_list";
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
app.use(
  session({
    secret: "passport-tutorial",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);
//app.use(express.static(path.join(__dirname, "public")));
// app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
if (!isProduction) {
  app.use(errorHandler());
}

require("./config/passport");
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

const PORT = process.env.PORT || 3000;

app.listen(`${PORT}`, () => {
  console.log(`Server now listening at port ${PORT}.`);
});

"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const indexRouter = require("./routes/index");
//Set up mongoose connection
/*const mongoose = require('mongoose');
const mongoDB = 'mongodb://mongo:27017/shopping_list';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));
app.use("/", indexRouter);
const PORT = process.env.PORT || 3000;

app.listen(`${PORT}`, () => {
  console.log(`Server now listening at port ${PORT}.`);
});

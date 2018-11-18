"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, min: 1, max: 30 }
});

//Export model
module.exports = mongoose.model("Item", ItemSchema);

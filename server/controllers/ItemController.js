"use strict";

const Item = require("../models/Item");

exports.item_list = (req, res, next) => {
  res.json({ item_list: ["Item 1", "Item 2", "Item 3"] });
  /*Item.find()
    .sort([["name", "ascending"]])
    .exec(function(err, list_items) {
      if (err) {
        return next(err);
      }
      //Successful, so send response
      res.json({ item_list: list_items });
    });*/
};

exports.item_create_post = (req, res, next) => {
  res.status(201).json({ name: req.body.name });
};

exports.item_delete_post = (req, res, next) => {
  res.sendStatus(204);
};

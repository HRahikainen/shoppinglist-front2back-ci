"use strict";

const Item = require("../models/Item");

exports.item_list = (req, res, next) => {
  //res.json({ item_list: ["Item 1", "Item 2", "Item 3"] });
  Item.find()
    .sort([["name", "ascending"]])
    .exec(function(err, list_items) {
      if (err) {
        console.log(err);
        return next(err);
      }
      //Successful, so send response
      res.json({ item_list: list_items });
    });
};

exports.item_create_post = (req, res, next) => {
  let item = new Item({ name: req.body.name });
  // Check if Item with same name already exists.
  Item.findOne({ name: req.body.name }).exec(function(err, found_item) {
    if (err) {
      return next(err);
    }

    if (found_item) {
      // Item exists, do nothing for now.
      res.sendStatus(200);
    } else {
      item.save(function(err) {
        if (err) {
          return next(err);
        }
        // Item saved.
        res.status(201).json({ name: item.name });
      });
    }
  });
  //res.status(201).json({ name: req.body.name });
};

exports.item_delete_post = (req, res, next) => {
  res.sendStatus(204);
};

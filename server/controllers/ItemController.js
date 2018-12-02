"use strict";

const Item = require("../models/Item");

exports.item_list = (req, res, next) => {
  Item.find()
    .sort([["name", "ascending"]])
    .exec(function(err, list_items) {
      if (err) {
        console.log(err);
        return next(err);
      }
      //Successful, so send response
      res.status(200).json({ item_list: list_items });
    });
};

exports.item_create_post = (req, res, next) => {
  let recv_item = new Item({ name: req.body.name });

  // Check validity
  const expr = /^[a-zA-Z0-9.,]+$/;
  const MAX_STR_LENGTH = 30;
  if (expr.test(recv_item.name) && recv_item.name.length <= MAX_STR_LENGTH) {
    // Check if Item with same name already exists.
    Item.findOne({ name: req.body.name }).exec(function(err, found_item) {
      if (err) {
        return next(err);
      }

      if (found_item) {
        // Item exists, do nothing for now.
        res.sendStatus(200);
      } else {
        recv_item.save(function(err) {
          if (err) {
            return next(err);
          }
          // Item saved.
          res.status(201).json({ item: recv_item });
        });
      }
    });
  } else {
    // Bad format of item name
    res.sendStatus(400);
  }
};

exports.item_delete_post = (req, res, next) => {
  Item.findById(req.params.id).exec((err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      Item.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
          return next(err);
        }
        // Success
        res.sendStatus(204);
      });
    } else {
      res.sendStatus(404);
    }
  });
};

exports.item_all_delete_post = (req, res, next) => {
  // Delete all Item documents from collection
  Item.deleteMany({}, function(err) {
    if (err) {
      return next(err);
    } else {
      res.sendStatus(204);
    }
  });
};

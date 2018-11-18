"use strict";

const express = require("express");
const router = express.Router();
const ItemController = require("../controllers/ItemController");

router.get("/", ItemController.item_list);

router.get("/items", ItemController.item_list);

router.post("/items/create", ItemController.item_create_post);

router.post("/items/:id/delete", ItemController.item_delete_post);
module.exports = router;

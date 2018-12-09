"use strict";

const router = require("express").Router();
const auth = require("./auth");
const UserController = require("../controllers/UserController");

// POST new user route (optional, everyone has access)
router.post("/", auth.optional, UserController.user_post);

// POST login route (optional, everyone has access)
router.post("/login", auth.optional, UserController.login_post);

//GET current route (required, only authenticated users have access)
router.get("/current", auth.required, UserController.current_get);

router.get("/logout", UserController.logout_get);

module.exports = router;

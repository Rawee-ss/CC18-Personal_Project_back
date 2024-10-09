const express = require("express");
const profileRoute = express.Router();
const profileController = require("../controllers/profile-controller");

profileRoute.patch("/", profileController.profile);

module.exports = profileRoute;

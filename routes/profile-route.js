const express = require("express");
const profileRoute = express.Router();
const profileController = require("../controllers/profile-controller");

profileRoute.get("/",profileController.getUserProfile)
profileRoute.patch("/", profileController.updateUserProfile);

module.exports = profileRoute;

const express = require("express");
const profileRoute = express.Router();
const profileController = require("../controllers/profile-controller");
const { authCheck } = require("../middleware/authenticate");

profileRoute.get("/",authCheck ,profileController.getUserProfile)
profileRoute.patch("/",authCheck, profileController.updateUserProfile);

module.exports = profileRoute;

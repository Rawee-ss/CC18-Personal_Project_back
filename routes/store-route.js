const express = require("express");
const storeRoute = express.Router();
const storeController = require("../controllers/store-controller");

storeRoute.patch("/", storeController.updateStore);

module.exports = storeRoute;

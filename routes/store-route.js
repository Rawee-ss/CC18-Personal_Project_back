const express = require("express");
const storeRoute = express.Router();
const storeController = require("../controllers/store-controller");
const { authCheck } = require("../middleware/authenticate");

storeRoute.patch("/:id",authCheck, storeController.updateStore);
storeRoute.get("/:id",authCheck, storeController.getStoreByid);

module.exports = storeRoute;

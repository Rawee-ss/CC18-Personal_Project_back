const express = require("express");
const cartRoute = express.Router();
const cartController = require("../controllers/cart-controller");
const { authCheck } = require("../middleware/authenticate");

cartRoute.post("/", authCheck, cartController.addItemCart);
cartRoute.get("/", authCheck, cartController.getItemCart);
cartRoute.delete("/", authCheck, cartController.deleteItemCart);

module.exports = cartRoute;

const express = require("express");
const cartRoute = express.Router();
const cartController = require("../controllers/cart-controller");
const { authCheck } = require("../middleware/authenticate");

cartRoute.post("/:productsId", authCheck, cartController.addItemCart);
cartRoute.get("/", authCheck, cartController.getItemCart);
cartRoute.delete("/:cartItemId", authCheck, cartController.deleteItemCart);

module.exports = cartRoute;

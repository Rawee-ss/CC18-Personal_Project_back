const express = require("express");
const cartRoute = express.Router();
const cartController = require("../controllers/cart-controller");

cartRoute.get("/", cartController.getAllCart);
cartRoute.patch("/:id", cartController.updateCart);

module.exports = cartRoute;

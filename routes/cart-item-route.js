const express = require("express")
const cartItemRoute = express.Router()
const cartItemController = require("../controllers/cart-item-controller")

cartItemRoute.delete("/id", cartItemController.deleteCartItem)


module.exports = cartItemRoute
const express = require("express");
const orderRoute = express.Router();
const orderController = require("../controllers/order-controller")

orderRoute.get("/", orderController.getAllOrder);
orderRoute.patch("/:id", orderController.createOrder);
orderRoute.delete("/:id", orderController.deleteOrder);

//Admin
// orderRoute.get("/", (req, res) => {
//   res.json("get all order for Admin");
// });
// orderRoute.patch("/:id", (req, res) => {
//   res.json("update order for Admin");
// });

module.exports = orderRoute;

const express = require("express");
const orderRoute = express.Router();
const orderController = require("../controllers/order-controller");
const { authCheck } = require("../middleware/authenticate");
const upload = require("../middleware/upload");

orderRoute.get("/", authCheck, orderController.getOrder);
orderRoute.post(
  "/",
  authCheck,
  upload.single("image"),
  orderController.createOrder
);
orderRoute.delete("/:id", orderController.deleteOrder);

module.exports = orderRoute;

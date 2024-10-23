const express = require("express");
const orderRoute = express.Router();
const orderController = require("../controllers/order-controller");
const { authCheck, adminCheck } = require("../middleware/authenticate");
const upload = require("../middleware/upload");

orderRoute.get("/", authCheck, orderController.getOrder);
orderRoute.get("/all", authCheck, adminCheck, orderController.getAllOrder);
orderRoute.get("/update-status", authCheck, adminCheck, orderController.getItemOrder);
orderRoute.patch(
  "/",
  authCheck,
  upload.single("image"),
  orderController.createOrder
);
orderRoute.patch(
  "/update-status/:id",
  authCheck,
  adminCheck,
  orderController.updateOrderStatus
);
orderRoute.delete("/:id", orderController.deleteOrder);

module.exports = orderRoute;

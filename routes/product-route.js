const express = require("express");
const productRoute = express.Router();
const productController = require("../controllers/product-controller");

productRoute.get("/", productController.getAllProduct);
productRoute.post("/", productController.createProduct);
productRoute.patch("/:id", productController.updateProduct);
productRoute.delete("/:id", productController.deleteProduct);

module.exports = productRoute;

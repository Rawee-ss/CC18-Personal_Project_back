const express = require("express");
const productRoute = express.Router();
const productController = require("../controllers/product-controller");
const upload = require("../middleware/upload");
const { authCheck, adminCheck } = require("../middleware/authenticate");

productRoute.post(
  "/",
  authCheck,
  adminCheck,
  upload.single("image"),
  productController.createProduct
);
productRoute.get("/:count", productController.getAllProduct);
productRoute.get("/detail/:id", productController.getProduct);
// productRoute.post("/productby", productController.productby);
productRoute.post("/search/filters", productController.searchFilters);
productRoute.patch(
  "/:id",
  authCheck,
  adminCheck,
  upload.single("image"),
  productController.updateProduct
);
productRoute.delete("/:productId",  productController.deleteProduct);

module.exports = productRoute;

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
productRoute.get("/:count", productController.getAllProduct); //ข้อมูลที่จะแสดงมีกี่ตัว
productRoute.post("/productby", productController.productby);
productRoute.post("/search/filters", productController.searchFilters);
productRoute.patch(
  "/:id",
  authCheck,
  adminCheck,
  upload.single('image'),
  productController.updateProduct
);
productRoute.delete("/:id", productController.deleteProduct);

module.exports = productRoute;

const express = require("express");
const productRoute = express.Router();
const productController = require("../controllers/product-controller");
const multer = require("../middleware/upload");

productRoute.post("/", multer.single("image"), productController.createProduct);
productRoute.get("/:count", productController.getAllProduct); //ข้อมูลที่จะแสดงมีกี่ตัว
productRoute.post("/productby", productController.productby);
productRoute.post("/search/filters", productController.searchFilters);
productRoute.patch("/:id", productController.updateProduct);
productRoute.delete("/:id", productController.deleteProduct);

module.exports = productRoute;

const express = require("express");
const categoryRoute = express.Router();
const categoryController = require("../controllers/category-controller");
const { authCheck, adminCheck } = require("../middleware/authenticate");

categoryRoute.get(
  "/",
  authCheck,
  adminCheck,
  categoryController.getAllCategory
);
categoryRoute.post(
  "/",
  authCheck,
  adminCheck,
  categoryController.createCategory
);
categoryRoute.delete(
  "/:id",
  authCheck,
  adminCheck,
  categoryController.deleteCategory
);

module.exports = categoryRoute;

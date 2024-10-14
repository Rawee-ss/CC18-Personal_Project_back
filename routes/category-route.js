const express = require("express");
const categoryRoute = express.Router();
const categoryController = require("../controllers/category-controller");

categoryRoute.get("/",categoryController.getAllCategory);
categoryRoute.post("/",categoryController.createCategory);
categoryRoute.delete("/:id",categoryController.deleteCategory);

module.exports = categoryRoute;

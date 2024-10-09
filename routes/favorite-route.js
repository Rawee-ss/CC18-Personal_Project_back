const express = require("express");
const favoriteRoute = express.Router();
const favoriteController = require("../controllers/favorite-controller");

favoriteRoute.get("/", favoriteController.getMyFavorite);
favoriteRoute.post("/", favoriteController.createFavorite);
favoriteRoute.delete("/:id", favoriteController.deleteMyFavorite);

module.exports = favoriteRoute;

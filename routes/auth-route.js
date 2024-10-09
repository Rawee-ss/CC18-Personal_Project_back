const express = require("express");
const authRouth = express.Router();
const authController = require("../controllers/auth-controller");

authRouth.post("/register", authController.register);
authRouth.post("/login", authController.login);

module.exports = authRouth;

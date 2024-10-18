const express = require("express");
const authRouth = express.Router();
const authController = require("../controllers/auth-controller");
const {authCheck} = require('../middleware/authenticate')

authRouth.post("/register", authController.register);
authRouth.post("/login", authController.login);
authRouth.post("/current-user",authCheck, authController.currentUser);
authRouth.post("/current-admin", authController.currentUser);

module.exports = authRouth;

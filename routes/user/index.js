const express = require("express");
const Router = express.Router();
const control = require('../../control/user/index')
Router.post("/login", control.login).post("/register", control.register)
exports.Router = Router

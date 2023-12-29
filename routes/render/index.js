const express = require("express");
const Router = express.Router();
const control = require('../../control/render/index')
Router.get("/", control.index).get("/dashboard", control.dashboardPage).get('/login', control.login).get("/register", control.register)
exports.Router = Router

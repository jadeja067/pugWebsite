"use strict";

var express = require("express");

var Router = express.Router();

var control = require('../../control/render/index');

Router.get("/", control.index).get("/dashboard", control.dashboardPage).get('/login', control.login).get("/register", control.register);
exports.Router = Router;
"use strict";

var express = require("express");

var Router = express.Router();

var control = require('../../control/user/index');

Router.post("/login", control.login).post("/register", control.register);
exports.Router = Router;
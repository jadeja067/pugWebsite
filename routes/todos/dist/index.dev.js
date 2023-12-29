"use strict";

var express = require("express");

var Router = express.Router();

var control = require("../../control/todos/index");

Router.get("/todos", control.getTodos).get("/todo/:id", control.getTodo).post("/addtodo", control.addTodo).patch("/todo/:id", control.updateTodo)["delete"]("/user/:id", control.deleteTodo);
exports.Router = Router;
const express = require("express");
const Router = express.Router();
const control = require("../../control/todos/index");
Router.get("/todos", control.getTodos)
  .get("/todo/:id", control.getTodo)
  .post("/addtodo", control.addTodo)
  .patch("/todo/:id", control.updateTodo)
  .delete("/user/:id", control.deleteTodo);
exports.Router = Router;

"use strict";

var _require = require("mongodb"),
    ObjectId = _require.ObjectId;

exports.getTodos = function _callee(req, res) {
  var result, todos;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          result = [];
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(db.collection("todos").find());

        case 4:
          todos = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(todos.forEach(function (element) {
            result.push(element);
          }));

        case 7:
          res.json(result);
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          res.json(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

exports.getTodo = function _callee2(req, res) {
  var todo;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(db.collection("todos").findOne({
            _id: new ObjectId(req.params.id)
          }));

        case 3:
          todo = _context2.sent;
          res.json(todo);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.json(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.addTodo = function _callee3(req, res) {
  var newTodo;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(db.collection("todos").insertOne(req.body));

        case 3:
          newTodo = _context3.sent;
          res.json(newTodo);
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.json(_context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.updateTodo = function _callee4(req, res) {
  var todo;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(db.collection("todos").updateOne({
            _id: new ObjectId(req.params.id)
          }, {
            $set: req.body
          }));

        case 3:
          todo = _context4.sent;
          res.json(todo);
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.json(_context4.t0);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.deleteTodo = function _callee5(req, res) {
  var todo;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(db.collection("todos").deleteOne({
            _id: new ObjectId(req.params.id)
          }));

        case 3:
          todo = _context5.sent;
          res.json(todo);
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.json(_context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
};
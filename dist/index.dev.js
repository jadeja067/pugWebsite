"use strict";

var express = require("express");

var _require = require("./db"),
    connectDb = _require.connectDb,
    getDb = _require.getDb;

var _require2 = require("mongodb"),
    ObjectId = _require2.ObjectId;

var cors = require('cors');

var renderPagesRoutes = require('./routes/render/index');

var userRoutes = require('./routes/user/index'); // MaddleWare


var app = express();
app.use(express.json());
app.set("view engine", "pug");
app.use(cors());
var db;
connectDb(function (e) {
  if (!e) {
    app.listen(5000, function () {
      return console.log("listening... at 5000");
    });
    db = getDb();
  }
}); // Rendering Pages Start

app.use(renderPagesRoutes.Router); // Register

app.use(userRoutes.Router);
app.post("/register"); // Get Profile Details

app.get("/user/:id", function _callee(req, res) {
  var request;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(db.collection("Db").findOne({
            _id: new ObjectId(req.params.id)
          }));

        case 3:
          request = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(res.json(request));

        case 6:
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.json(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Update Profile Details

app.patch("/user/:id", function _callee2(req, res) {
  var request;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(req.body);
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(db.collection("Db").updateOne({
            _id: new ObjectId(req.params.id)
          }, {
            $set: req.body
          }));

        case 4:
          request = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(res.json(request));

        case 7:
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](1);
          res.json(_context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 9]]);
}); // Todo CRUD Starting

app.get("/todos", function (req, res) {
  var result = [];
  db.collection("todos").find().forEach(function (e) {
    return result.push(e);
  }).then(function () {
    return res.json(result);
  })["catch"](function (e) {
    return console.log(e);
  });
});
app.get("/todo/:id", function (req, res) {
  db.collection("todos").findOne({
    _id: new ObjectId(req.params.id)
  }).then(function (d) {
    return res.json(d);
  })["catch"](function (e) {
    return console.log(e);
  });
});
app.post("/addtodo", function _callee3(req, res) {
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
          _context3.next = 6;
          return regeneratorRuntime.awrap(res.json(newTodo));

        case 6:
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          res.json(_context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.patch("/todo/:id", function (req, res) {
  console.log(req.params.id);
  db.collection("todos").updateOne({
    _id: new ObjectId(req.params.id)
  }, {
    $set: req.body
  }).then(function (d) {
    return res.json(d);
  })["catch"](function (e) {
    return console.log(e);
  });
});
app["delete"]("/todo/:id", function (req, res) {
  console.log(req.params.id);
  db.collection("todos").deleteOne({
    _id: new ObjectId(req.params.id)
  }).then(function (d) {
    return res.json(d);
  })["catch"](function (e) {
    return console.log(e);
  });
}); // Todo CRUD Over
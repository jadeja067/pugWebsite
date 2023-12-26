"use strict";

var express = require("express");

var _require = require("./db"),
    connectDb = _require.connectDb,
    getDb = _require.getDb;

var _require2 = require("mongodb"),
    ObjectId = _require2.ObjectId; // MaddleWare


var app = express();
app.use(express.json());

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "pug");
var db;
connectDb(function (e) {
  if (!e) {
    app.listen(5000, function () {
      return console.log("listening...");
    });
    db = getDb();
  }
}); // Rendering Pages Start

app.get("/", function (req, res) {
  res.redirect("dashboard");
});
app.get("/login", function (req, res) {
  res.render("index");
});
app.get("/register", function (req, res) {
  res.render("register");
});
app.get("/dashboard", function (req, res) {
  res.render("dashboard");
}); // Rendering Pages Over
// login

app.post("/dashboard", function (req, res) {
  db.collection("Db").findOne({
    username: req.body.username,
    password: req.body.password
  }).then(function (data) {
    if (!data) res.render("index", {
      response: false
    });else res.render("dashboard", {
      response: true
    });
  })["catch"](function (e) {
    return console.log(e);
  });
}); // Register

app.post("/register", function (req, res) {
  db.collection("Db").findOne({
    username: req.body.username,
    password: req.body.password
  }).then(function (data) {
    var exists = false;

    if (!data || data == null) {
      db.collection("Db").insertOne(req.body);
    } else exists = true;

    res.render("register");
  })["catch"](function (e) {
    return console.log(e);
  });
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
  console.log(req.params.id);
  db.collection("todos").findOne({
    _id: new ObjectId(req.params.id)
  }).then(function (d) {
    return res.json(d);
  })["catch"](function (e) {
    return console.log(e);
  });
});
app.post("/addtodo", function _callee(req, res) {
  var newTodo;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(db.collection("todos").insertOne(req.body));

        case 3:
          newTodo = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(res.json(newTodo));

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
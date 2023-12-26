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

app.post("/login", function _callee(req, res) {
  var request;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(db.collection("Db").findOne({
            username: req.body.username,
            password: req.body.password
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
}); // Get Profile Details

app.get("/user/:id", function _callee2(req, res) {
  var request;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(db.collection("Db").findOne({
            _id: new ObjectId(req.params.id)
          }));

        case 3:
          request = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(res.json(request));

        case 6:
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.json(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Update Profile Details

app.patch("/user/:id", function _callee3(req, res) {
  var request;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log(req.body);
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(db.collection("Db").updateOne({
            _id: new ObjectId(req.params.id)
          }, {
            $set: req.body
          }));

        case 4:
          request = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(res.json(request));

        case 7:
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](1);
          res.json(_context3.t0);

        case 12:
        case "end":
          return _context3.stop();
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
app.post("/addtodo", function _callee4(req, res) {
  var newTodo;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(db.collection("todos").insertOne(req.body));

        case 3:
          newTodo = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(res.json(newTodo));

        case 6:
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          res.json(_context4.t0);

        case 11:
        case "end":
          return _context4.stop();
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
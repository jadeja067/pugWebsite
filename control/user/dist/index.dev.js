"use strict";

var sjcl = require("sjcl");

exports.login = function _callee(req, res) {
  var password, request;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          password = sjcl.encrypt("devmonk", req.body.password);
          console.log(req.body);
          _context.next = 5;
          return regeneratorRuntime.awrap(db.collection("Db").findOne({
            username: req.body.username,
            password: password
          }));

        case 5:
          request = _context.sent;
          res.json(request);
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          res.json(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.register = function _callee2(req, res) {
  var password, find;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          password = sjcl.encrypt("devmonk", req.body.password);
          console.log(password);
          req.body.password = password;
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(db.collection("Db").findOne({
            username: req.body.username,
            password: password
          }));

        case 6:
          find = _context2.sent;
          console.log(find); // if (find) {
          //   const insertionRequest = await db.collection("Db").insertOne(req.body);
          //   console.log(insertionRequest)
          //   res.json(insertionRequest);
          // } else {
          //   res.json(find);
          // }

          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](3);
          res.json(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 10]]);
};
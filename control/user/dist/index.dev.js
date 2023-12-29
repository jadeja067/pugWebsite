"use strict";

var sjcl = require("sjcl");

var _require = require("mongodb"),
    ObjectId = _require.ObjectId;

exports.login = function _callee(req, res) {
  var password, request;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          password = sjcl.encrypt("devmonk", req.body.password);
          _context.next = 4;
          return regeneratorRuntime.awrap(db.collection("Db").findOne({
            username: req.body.username,
            password: req.body.password
          }));

        case 4:
          request = _context.sent;
          res.json(request);
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
};

exports.register = function _callee2(req, res) {
  var password, find, insertionRequest;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          password = sjcl.encrypt("devmonk", req.body.password);
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(db.collection("Db").findOne({
            username: req.body.username,
            password: req.body.password
          }));

        case 4:
          find = _context2.sent;

          if (find) {
            _context2.next = 12;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(db.collection("Db").insertOne(req.body));

        case 8:
          insertionRequest = _context2.sent;
          res.json(insertionRequest);
          _context2.next = 13;
          break;

        case 12:
          res.json(find);

        case 13:
          _context2.next = 18;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](1);
          res.json(_context2.t0);

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 15]]);
};

exports.getUser = function _callee3(req, res) {
  var request;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(db.collection("Db").findOne({
            _id: new ObjectId(req.params.id)
          }));

        case 3:
          request = _context3.sent;
          console.log(request);
          res.json(request);
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
};

exports.updateUser = function _callee4(req, res) {
  var request;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(db.collection("Db").updateOne({
            _id: new ObjectId(req.params.id)
          }, {
            $set: req.body
          }));

        case 3:
          request = _context4.sent;
          res.json(request);
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
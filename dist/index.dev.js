"use strict";

var express = require("express");

var _require = require("./db"),
    connectDb = _require.connectDb,
    getDb = _require.getDb;

var cors = require('cors');

var renderPagesRoutes = require('./routes/render/index');

var userRoutes = require('./routes/user/index');

var TodoRouter = require("./routes/todos/index"); // MaddleWare


var app = express();
app.use(express.json());
app.set("view engine", "pug");
app.use(express["static"]('scripts'));
app.use(cors());
var db;
connectDb(function (e) {
  if (!e) {
    app.listen(7000, function () {
      return console.log("listening... at 5000");
    });
    db = getDb();
  }
}); // Rendering Pages Start

app.use(renderPagesRoutes.Router); // user Routes

app.use(userRoutes.Router); // Todo Routes

app.use(TodoRouter.Router);
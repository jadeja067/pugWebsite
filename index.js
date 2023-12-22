const express = require("express");
const { connectDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");

// MaddleWare
const app = express();
app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");

let db;
connectDb((e) => {
  if (!e) {
    app.listen(5000, () => console.log("listening..."));
    db = getDb();
  }
});

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/dashboard", (req, res) => {
  db.collection("Db")
    .findOne({name: req.body.username, password: req.body.password})
    .then((data) => res.render('dashboard', {response: data ? true : false}))
    .catch((e) => console.log(e));
});

app.listen(4000, () => console.log("listening2..."));

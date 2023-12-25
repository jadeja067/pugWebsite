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
  res.redirect("dashboard");
});

app.get("/login", (req, res) => {
  res.render("index");
});

app.post("/login", (req, res) => {
  db.collection("Db")
    .findOne({ username: req.body.username, password: req.body.password })
    .then((data) => {
      if (!data) res.render("index", { response: false });
      else {
        
        res.redirect('dashboard')
      }
    })
    .catch((e) => console.log(e));
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  db.collection("Db")
    .findOne({ username: req.body.username, password: req.body.password })
    .then((data) => {
      let exists = false
      if (!data || data == null) {
        db.collection("Db")
        .insertOne(req.body);
      }
      else exists = true
      res.render("register");
    })
    .catch((e) => console.log(e));
});

app.get("/dashboard", (req, res) => {
  console.log(req.body)
  res.render("dashboard");
});

app.post("/dashboard", (req, res) => {
  db.collection("Db")
    .findOne({ username: req.body.username, password: req.body.password })
    .then((data) => res.render("dashboard", { response: data ? true : false }))
    .catch((e) => console.log(e));
});

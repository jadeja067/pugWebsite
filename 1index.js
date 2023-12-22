const express = require("express");
const { connectDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");
const pug = require('pug');

// MaddleWare
const app = express();
app.use(express.json());

// Connection
let db;
connectDb((e) => {
  if (!e) {
    app.listen(5000, () => console.log("listening..."));
    db = getDb();
  }
});
const data = [];

app.post("/", (req, res) => {
    db.collection("Db")
      .findOne({ name: req.body.name, password: req.body.password})
      .then(data => res.json({user: 1}))
      .catch(e => res.json({user: 0}));
});

app.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 0, bunch = 4
  db.collection("Db")
    .find().skip(page * bunch).limit(bunch)
    .forEach((user) => data.push(user))
    .then(() => res.json(data))
    .catch((e) => console.log(e));
});

app.get("/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("Db")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then(data => res.json(data))
      .catch(e => console.log(e));
  } else {
    res.json({ error: "Gien id is Invalid." });
  }
});

app.post("/", (req, res) => {
  db.collection("Db")
    .insertOne(req.body)
    .then(data => res.json(data))
    .catch(e => console.log(e));
});

app.delete("/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("Db")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then(data => res.json(data))
      .catch(e => console.log(e));
  } else {
    res.json({ error: "Given id is Invalid." });
  }
});

app.patch("/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("Db")
      .updateOne({ _id: new ObjectId(req.params.id) }, {$set: req.body})
      .then(data => res.json(data))
      .catch(e => console.log(e));
  } else {
    res.json({ error: "Gien id is Invalid." });
  }
});

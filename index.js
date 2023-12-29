const express = require("express");
const { connectDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");
const cors = require('cors');


// MaddleWare
const app = express();
app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.use(cors())
let db;
connectDb((e) => {
  if (!e) {
    app.listen(5000, () => console.log("listening... at 5000"));
    db = getDb();
  }
});

// Rendering Pages Start
app.get("/", (req, res) => {
  res.redirect("dashboard");
});

app.get("/login", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
// Rendering Pages Over

// login
app.post("/login", async (req, res) => {
  try{
    const request = await db
    .collection("Db")
    .findOne({ username: req.body.username, password: req.body.password });
    await res.json(request);
  }catch(e){ 
    res.json(e)
  }
});

// Register
app.post("/register", (req, res) => {
  db.collection("Db")
    .findOne({ username: req.body.username, password: req.body.password })
    .then((data) => {
      let exists = false;
      if (!data || data == null) {
        db.collection("Db").insertOne(req.body);
      } else exists = true;
      res.render("register");
    })
    .catch((e) => console.log(e));
});

// Get Profile Details
app.get("/user/:id", async (req, res) => {
  try{
    const request = await db
    .collection("Db")
    .findOne({ _id: new ObjectId(req.params.id) });
    await res.json(request);
  }catch(e){ 
    res.json(e)
  }
});

// Update Profile Details
app.patch("/user/:id", async (req, res) => {
  console.log(req.body)
  try{
    const request = await db
    .collection("Db")
    .updateOne({ _id: new ObjectId(req.params.id) }, {$set: req.body});
    await res.json(request);
  }catch(e){ 
    res.json(e)
  }
});

// Todo CRUD Starting
app.get("/todos", (req, res) => {
  const result = [];
  db.collection("todos")
    .find()
    .forEach((e) => result.push(e))
    .then(() => res.json(result))
    .catch((e) => console.log(e));
});

app.get("/todo/:id", (req, res) => {
  db.collection("todos")
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((d) => res.json(d))
    .catch((e) => console.log(e));
});

app.post("/addtodo", async (req, res) => {
  try {
    const newTodo = await db.collection("todos").insertOne(req.body);
    await res.json(newTodo);
  } catch (e) {
    res.json(e);
  }
});

app.patch("/todo/:id", (req, res) => {
  console.log(req.params.id);
  db.collection("todos")
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
    .then((d) => res.json(d))
    .catch((e) => console.log(e));
});

app.delete("/todo/:id", (req, res) => {
  console.log(req.params.id);
  db.collection("todos")
    .deleteOne({ _id: new ObjectId(req.params.id) })
    .then((d) => res.json(d))
    .catch((e) => console.log(e));
});

// Todo CRUD Over

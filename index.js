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
app.post("/dashboard", (req, res) => {
  db.collection("Db")
    .findOne({ username: req.body.username, password: req.body.password })
    .then((data) => {
      if (!data) res.render("index", { response: false });
      else res.render("dashboard", { response: true });
    })
    .catch((e) => console.log(e));
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
  console.log(req.params.id)
  db.collection("todos")
    .findOne({_id: new ObjectId(req.params.id)})
    .then((d) => res.json(d))
    .catch((e) => console.log(e));
});

app.post("/addtodo", async (req, res) => {
  try{
    const newTodo = await db.collection("todos")
    .insertOne(req.body)
    await res.json(newTodo)
  }catch(e){
    res.json(e)
  }
});

app.patch("/todo/:id", (req, res) => {
  console.log(req.params.id)
  db.collection("todos")
    .updateOne({_id: new ObjectId(req.params.id)}, {$set: req.body})
    .then((d) => res.json(d))
    .catch((e) => console.log(e));
});

app.delete("/todo/:id", (req, res) => {
  console.log(req.params.id)
  db.collection("todos")
    .deleteOne({_id: new ObjectId(req.params.id)})
    .then((d) => res.json(d))
    .catch((e) => console.log(e));
});

// Todo CRUD Over

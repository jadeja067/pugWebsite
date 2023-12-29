const express = require("express");
const { connectDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");
const cors = require('cors');
const renderPagesRoutes = require('./routes/render/index')
const userRoutes = require('./routes/user/index')
// MaddleWare
const app = express();
app.use(express.json());
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
app.use(renderPagesRoutes.Router)
// Register
app.use(userRoutes.Router)

app.post("/register");

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

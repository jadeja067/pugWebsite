const express = require("express");
const { connectDb, getDb } = require("./db");
const cors = require('cors');
const renderPagesRoutes = require('./routes/render/index')
const userRoutes = require('./routes/user/index')
const TodoRouter  = require("./routes/todos/index")
const app = express();
let db;

// MaddleWare
app.use(express.json());
app.set("view engine", "pug");
app.use(express.static('scripts'))
app.use(cors())

// connection
connectDb((e) => {
  if (!e) {
    app.listen(7000, () => console.log("listening... at 5000"));
    db = getDb();
    console.log("db connection", db);
  }
});

// Rendering Pages Start
app.use(renderPagesRoutes.Router)

// user Routes
app.use(userRoutes.Router)

// Todo Routes
app.use(TodoRouter.Router)

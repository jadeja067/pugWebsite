exports.getTodos = async (req, res) => {
  const result = [];
  try {
    const todos = await db.collection("todos").find();
    await todos.forEach((element) => {
      result.push(element);
    });
    res.json(result);
  } catch (e) {
    res.json(e);
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todo = await db
      .collection("todos")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.json(todo);
  } catch (e) {
    res.json(e);
  }
};

exports.addTodo = async (req, res) => {
  try {
    const newTodo = await db.collection("todos").insertOne(req.body);
    res.json(newTodo);
  } catch (e) {
    res.json(e);
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await db
      .collection("todos")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
    res.json(todo);
  } catch (e) {
    res.json(e);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await db
      .collection("todos")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(todo)
  } catch (e) {
    res.json(e);
  }
};

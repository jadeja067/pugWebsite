const sjcl = require("sjcl");
exports.login = async (req, res) => {
  try {
    const password = sjcl.encrypt("devmonk", req.body.password);
    console.log(password)
    const request = await db
      .collection("Db")
      .findOne({ username: req.body.username, password: req.body.password });
    res.json(request);
  } catch (e) {
    res.json(e);
  }
};

exports.register = async (req, res) => {
  const password = sjcl.encrypt("devmonk", req.body.password)
  try {
    const find = await db
      .collection("Db")
      .findOne({ username: req.body.username, password: req.body.password });
    if (!find) {
      const insertionRequest = await db.collection("Db").insertOne(req.body);
      console.log(insertionRequest)
      res.json(insertionRequest);
    } else {
      res.json(find);
    }
  } catch (e) {
    res.json(e);
  }
};

exports.getUser =  async (req, res) => {
  try{
    const request = await db
    .collection("Db")
    .findOne({ _id: new ObjectId(req.params.id) });
    await res.json(request);
  }catch(e){ 
    res.json(e)
  }
}

exports.updateUser = async (req, res) => {
  console.log(req.body)
  try{
    const request = await db
    .collection("Db")
    .updateOne({ _id: new ObjectId(req.params.id) }, {$set: req.body});
    await res.json(request);
  }catch(e){ 
    res.json(e)
  }
}
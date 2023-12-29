const sjcl = require("sjcl");
exports.login = async (req, res) => {
  try {
    const password = sjcl.encrypt("devmonk", req.body.password);
    console.log(req.body)
    const request = await db
      .collection("Db")
      .findOne({ username: req.body.username, password: password });
    res.json(request);
  } catch (e) {
    res.json(e);
  }
};

exports.register = async (req, res) => {
  const password = sjcl.encrypt("devmonk", req.body.password)
  console.log(password)
  req.body.password = password
  try {
    const find = await db
      .collection("Db")
      .findOne({ username: req.body.username, password: password });
      console.log(find)
    // if (find) {
    //   const insertionRequest = await db.collection("Db").insertOne(req.body);
    //   console.log(insertionRequest)
    //   res.json(insertionRequest);
    // } else {
    //   res.json(find);
    // }
  } catch (e) {
    res.json(e);
  }
};

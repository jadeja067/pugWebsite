const { MongoClient } = require("mongodb");
module.exports = {
  connectDb: (cb) => {
    MongoClient.connect("mongodb://localhost:27017/admin")
      .then((client) => {
        db = client.db()
        return cb()
    })
      .catch((e) => {
        console.log(e)
        return cb(e)
    });
  },
  getDb: () => db,
};

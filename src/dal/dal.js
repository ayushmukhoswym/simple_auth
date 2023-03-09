const { MongoClient, ObjectId } = require("mongodb");
const config = require("config");
const mongoose = require("mongoose");
const User = require("../models/User");

// async function connecttodb() {
//   let url = `mongodb://localhost:27017/Swym`;
//   // if (config.has('dbConfig.password')) {
//   //     url = `${config.get('dbConfig.prefix')}://${config.get('dbConfig.userName')}:${config.get('dbConfig.password')}${config.get('dbConfig.hostUrl')}`;
//   //     console.log(url);
//   // }else {
//   //     url = `mongodb://${config.get('dbConfig.hostUrl')}`;
//   // }
//   const client = new MongoClient(url);
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log("Connected successfully to server", client);
//   //return client;
// }

async function connecttodb() {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(`mongodb://localhost:27017/Swym`)
    .then((con) => console.log(`Database connected: ${con.connection.host}`))
    .catch((err) => console.log(err));
}

const findUser = async (email) => {
  connecttodb();
  return await User.findOne({ email });
};

const createUser = async (details) => {
  connecttodb();
  const { name, email, password } = details;

  return await User.create({
    name,
    email,
    password,
  });
};

module.exports = {
  findUser,
  createUser,
};

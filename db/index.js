const mongoose = require("mongoose");
// require("dotenv").config();
const url = "mongodb://127.0.0.1/images";

const connection = async () => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true });
    console.log("Connected to database ...");
  } catch (err) {
    if (err) throw err;
    console.log("Could not connect to database !");
  }
};
module.exports = connection;

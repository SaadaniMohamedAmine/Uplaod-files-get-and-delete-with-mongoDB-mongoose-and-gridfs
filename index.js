require("dotenv").config();
const express = require("express");
const port = 3001;
const connection = require("./db");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

let gfs;
const app = express();

app.use(express.json({ limit: "1mb" }));

//database connection
connection();

const connect = mongoose.connection;
connect.once("open", () => {
  gfs = Grid(connect.db, mongoose.mongo);
  gfs.collection("images");
});

//routes middleware
app.use("/", require("./routes"));

app.get("/file/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.send("not found");
  }
});
app.delete("/file/:filename", async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("An error occured.");
  }
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on ${port} ...`);
});

const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

router.get("/test", (req, res) => {
  res.json({ msg: "Test message for routing !!" });
});
router.post("/upload", upload.single("file"), (req, res) => {
  if (req.file === undefined) return res.send("you must select a file.");
  const imgUrl = `http://localhost:3001/file/${req.file.filename}`;
  return res.send(imgUrl);
});

module.exports = router;

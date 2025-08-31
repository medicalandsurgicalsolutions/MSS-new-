const express = require("express");
const upload = require("../middleware/upload");

const router = express.Router();

// Single Image Upload
router.post("/single", upload.single("image"), (req, res) => {
//   console.log("Single ", req.file);
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ imageUrl: req.file.path });
});

// Multiple Images Upload
router.post("/multiple", upload.array("images", 5), (req, res) => {
    // console.log("Multiple");
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }
  const imageUrls = req.files.map((file) => file.path);
  res.json({ imageUrls });
});

module.exports = router;

const express = require("express");
const multer = require("multer");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware");

const upload = multer({ storage: multer.memoryStorage() });
console.log("🚀 ~ upload:", upload)

router.post(
  "/generateSpeech",
  authenticateUser,
  upload.single("text"),
  require("../controllers/Speech/generateSpeech").process
);

module.exports = router;
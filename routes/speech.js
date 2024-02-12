const express = require("express");
const multer = require("multer");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware");

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/generateSpeech",
  authenticateUser,
  upload.single("audio"),
  require("../controllers/Speech/generateSpeech").process
);

module.exports = router;

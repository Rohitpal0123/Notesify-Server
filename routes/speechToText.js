const express = require("express");
const multer = require("multer");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware");

const upload = multer({ storage: multer.memoryStorage() });

router.get(
  "/get",
  authenticateUser,
  upload.single("audio"),
  require("../controllers/SpeechToText/get").process
);

module.exports = router;

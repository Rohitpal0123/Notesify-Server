const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const authenticateUser = require("../middleware/authMiddleware");
const s3Storage = require("../middleware/multerS3Middleware");

// function to sanitize files and send error for unsupported files
function sanitizeFile(file, cb) {
  // Define the allowed extension
  const fileExts = [".mp3", "mp4", "mpeg", "mpga", "m4a", "wav", "webm"];

  // Check allowed extensions
  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  );

  // Mime type must be an image
  const isAllowedMimeType = file.mimetype.startsWith("audio/");

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true); // no errors
  } else {
    // pass error msg to callback, which can be displaye in frontend
    cb("Error: File type not allowed!");
  }
}

// our middleware
const upload = multer({
  storage: s3Storage,
  fileFilter: (req, file, callback) => {
    sanitizeFile(file, callback);
  },
  limits: {
    fileSize: 1024 * 1024 * 25 // 25mb file size
  }
});

router.post(
  "/transcriptAudio",
  authenticateUser,
  upload.single("audio"),
  require("../controllers/Transcript/transcriptAudio").process
);

module.exports = router;

const express = require("express");
const router = express.Router();

router.post(
  "/chatAssistant",
  require("../controllers/Chat/chatAssistant.js").process
);

module.exports = router;

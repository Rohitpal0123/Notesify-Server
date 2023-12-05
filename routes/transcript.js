const express = require("express");
const router = express.Router();
router.get("/get", require("../controllers/Transcript/get").process);

module.exports = router;

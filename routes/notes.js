const express = require("express");
const router = express.Router();

router.post("/add", require("../controllers/Notes/add").process);

module.exports = router;

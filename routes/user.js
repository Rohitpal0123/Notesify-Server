const express = require("express");
const router = express.Router();

router.post("/signup", require("../controllers/User/signup").process);

module.exports = router;

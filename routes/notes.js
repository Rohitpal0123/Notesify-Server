const express = require("express");
const router = express.Router();

router.get("/get", require("../controllers/Notes/get").process);
router.get("/getAll", require("../controllers/Notes/getall").process);
router.post("/add", require("../controllers/Notes/add").process);
router.delete("/delete", require("../controllers/Notes/delete").process);
router.delete("/deleteAll", require("../controllers/Notes/deleteAll").process);
router.put("/update", require("../controllers/Notes/update").process);

module.exports = router;

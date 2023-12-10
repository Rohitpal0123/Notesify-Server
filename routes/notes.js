const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware");

router.get(
  "/get",
  authenticateUser,
  require("../controllers/Notes/get").process
);
router.get(
  "/getAll",
  authenticateUser,
  require("../controllers/Notes/getall").process
);
router.post(
  "/add",
  authenticateUser,
  require("../controllers/Notes/add").process
);
router.delete(
  "/delete",
  authenticateUser,
  require("../controllers/Notes/delete").process
);
router.delete(
  "/deleteAll",
  authenticateUser,
  require("../controllers/Notes/deleteAll").process
);
router.put(
  "/update",
  authenticateUser,
  require("../controllers/Notes/update").process
);

module.exports = router;

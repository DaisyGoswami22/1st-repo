const express = require("express");
const { createResult, getResult } = require("../controllers/resultController");
const router = express.Router();

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

router
  .route("/result/create")
  .post(isAuthenticated, authorizeRoles("professor", "admin"), createResult);
router.route("/result/:id").get(isAuthenticated, getResult);

module.exports = router;

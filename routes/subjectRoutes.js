const express = require("express");
const {
  createSubject,
  getAllSubjects,
  getSubjectDetails,
  deleteSubject,
} = require("../controllers/subjectController");
const router = express.Router();

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

router
  .route("/subject/create")
  .post(isAuthenticated, authorizeRoles("admin"), createSubject);

router.route("/getAllSubjects").get(isAuthenticated, getAllSubjects);

router
  .route("/subject/:id")
  .get(isAuthenticated, getSubjectDetails)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteSubject);

module.exports = router;

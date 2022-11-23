const express = require("express");
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const {
  registerStudent,
  loginStudent,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  getStudentDetails,
  deleteStudent,
  getAllStudents,
  updateStudentDetails,
} = require("../controllers/studentController");
const { myProfile } = require("../controllers/userController");

router
  .route("/register/student")
  .post(isAuthenticated, authorizeRoles("professor", "admin"), registerStudent);

router.route("/login/student").post(loginStudent);
router.route("/logout/student").get(logout);

// ---------------password-------------------
router.route("/student/password/forgot").post(forgotPassword);
router.route("/student/password/reset/:token").put(resetPassword);
router.route("/usessword/update").put(isAuthenticated, updatePassword);

// ---------------Profile---------------------
router.route("/student/profile").get(isAuthenticated, myProfile);
router
  .route("/student/update/profile")
  .put(isAuthenticated, updateStudentDetails);
router
  .route("/student/profile/:id")
  .get(
    isAuthenticated,
    authorizeRoles("professor", "admin"),
    getStudentDetails
  );
router
  .route("/students")
  .get(isAuthenticated, authorizeRoles("admin"), getAllStudents);

router
  .route("/delete/student/:id")
  .delete(isAuthenticated, authorizeRoles("admin"), deleteStudent);

// attendence routes

module.exports = router;

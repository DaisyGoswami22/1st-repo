const express = require("express");
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  logOut,
  forgotPassword,
  resetPassword,
  updatePassword,
  myProfile,
  getAllUser,
  updateUserSubjects,
  deleteUser,
  getUserDetails,
} = require("../controllers/userController");

// ------------------auth--------------------
router
  .route("/register/user")
  .post(isAuthenticated, authorizeRoles("admin"), registerUser);
router.route("/login/user").post(loginUser);
router.route("/logout/user").get(logOut);

// ---------------password-------------------
router.route("/user/password/forgot").post(forgotPassword);
router.route("/user/password/reset/:token").put(resetPassword);
router.route("/usessword/update").put(isAuthenticated, updatePassword);

// ---------------Profile---------------------
router.route("/user/profile").get(isAuthenticated, myProfile);
router.route("/user/update/profile").put(isAuthenticated, updateProfile);
router.route("/user/profile/:id").get(getOtherProfile);

// ---------------Users-----------------------
router
  .route("/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUser);

router
  .route("/update/subject/user/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateUserSubjects);

router
  .route("/delete/user/:id")
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUser);

router
  .route("/detail/user/:id")
  .get(isAuthenticated, authorizeRoles("professor", "admin"), getUserDetails);

module.exports = router;

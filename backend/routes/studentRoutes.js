const { Router } = require("express");
const express = require ("express");
const { registerStudent } = require("../controllers/studentController");
const router = express.Router();

router.route("/student/register").post(registerStudent)

module.exports = router


const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

exports.registerStudent = catchAsyncErrors(async(req,res,next) => {

const {name,
address,
phone_no,
age,
email,
password,
DOB,
semester,} = req.body

    const student = await Student.create({name,
        address,
        phone_no,
        age,
        email,
        password,
        DOB,
        semester})

    res.status(201).json({
        success:true,
        student
    })
})
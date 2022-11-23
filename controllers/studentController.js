const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Student = require("../models/studentModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

exports.registerStudent = catchAsyncErrors(async (req, res, next) => {
  const { name, email, number, DOB, password, semester } = req.body;

  const student = await Student.create({
    name,
    email,
    number,
    password,
    DOB,
    semester,
    avatar: {
      public_id: "temp public id",
      url: "temp url",
    },
  });

  sendToken(student, 201, res);
});

exports.loginStudent = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if student has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const student = await Student.findOne({ email }).select("+password");

  if (!student) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await student.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(student, 200, res);
});

// Logout student
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email });

  if (!student) {
    return next(new ErrorHandler("Student not found", 404));
  }

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/student/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: student.email,
      subject: `BCA Management System Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${student.email} successfully`,
    });
  } catch (error) {
    student.resetPasswordToken = undefined;
    student.resetPasswordExpire = undefined;

    await student.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const student = await Student.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!student) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not password", 400));
  }

  student.password = req.body.password;
  student.resetPasswordToken = undefined;
  student.resetPasswordExpire = undefined;

  await student.save();

  sendToken(student, 200, res);
});

// update Student password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.student.id).select("+password");

  const isPasswordMatched = await student.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  student.password = req.body.newPassword;

  await student.save();

  sendToken(student, 200, res);
});

// Delete Student --Admin
exports.deleteStudent = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return next(
      new ErrorHandler(`Student does not exist with Id: ${req.params.id}`, 400)
    );
  }

  // const imageId = student.avatar.public_id;

  // await cloudinary.v2.uploader.destroy(imageId);

  await student.remove();

  res.status(200).json({
    success: true,
    message: "Student Deleted Successfully",
  });
});

// get student details
exports.getStudentDetails = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (!student)
    return next(
      new ErrorHandler(`student with id: ${req.params.id} not found`, 404)
    );

  res.status(200).json({
    success: true,
    student,
  });
});

//   get all students
exports.getAllStudents = catchAsyncErrors(async (req, res, next) => {
  const students = await Student.find();

  res.status(200).json({
    success: true,
    students,
  });
});

// update student details
exports.updateStudentDetails = catchAsyncErrors(async (req, res, next) => {
  const newDetails = {
    subjects: req.body.subjects,
    semester: {
      semesterName: req.body.semesterName,
      subjects: req.body.subjects,
    },
  };

  await Student.findByIdAndUpdate(req.params.id, newDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

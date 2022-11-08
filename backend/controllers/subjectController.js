const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Subject = require("../models/subjectModel");

// create subject
exports.createSubject = catchAsyncErrors(async (req, res, next) => {
  const { subjectName, subjectCode, faculty } = req.body;

  const subject = await Subject.create({ subjectName, subjectCode, faculty });

  res.status(201).json({
    success: true,
    subject,
  });
});

// get all subjects
exports.getAllSubjects = catchAsyncErrors(async (req, res, next) => {
  const subjects = await Subject.find();

  res.status(200).json({
    success: true,
    subjects,
  });
});

// get specific subject
exports.getSubjectDetails = catchAsyncErrors(async (req, res, next) => {
  const subject = await Subject.findById(req.params.id);

  if (!subject)
    return next(
      new ErrorHandler(`Subject not found with id: ${req.params.id}`, 404)
    );

  res.status(200).json({
    success: true,
    subject,
  });
});

// delete subject
exports.deleteSubject = catchAsyncErrors(async (req, res, next) => {
  const subject = await Subject.findById(req.params.id);

  if (!subject)
    return next(
      new ErrorHandler(`Subject not found with id: ${req.params.id}`, 404)
    );

  await subject.remove();

  res.status(200).json({
    success: true,
    message: "Subject deleted",
  });
});

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Result = require("../models/resultModel");

// create result
exports.createResult = catchAsyncErrors(async (req, res, next) => {
  const { student, semester } = req.body;

  const preparedBy = req.user._id;

  const result = await Result.create({ student, semester, preparedBy });

  res.status(201).json({
    success: true,
    result,
  });
});

// get result of student
exports.getResult = catchAsyncErrors(async (req, res, next) => {
  const result = await Result.find({ student: req.params.id });

  if (!result)
    return next(
      new ErrorHandler(`Result not found for student id ${req.params.id}`, 404)
    );

  res.status(200).json({
    success: true,
    result,
  });
});

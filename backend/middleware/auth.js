const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const Faculty = require("../models/facultyModel");

exports.isAuthenticatedFaculty = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return next(new ErrorHandler("Please login to access this resourse", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.faculty = await Faculty.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.faculty.role))
      return next(new ErrorHandler("You aren't allowed to access", 403));

    next();
  };
};

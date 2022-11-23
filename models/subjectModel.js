const mongoose = require("mongoose");

const subjectModel = new mongoose.Schema({
  subjectName: {
    type: String,
    required: [true, "Please enter subject name"],
    unique: true,
  },
  subjectCode: {
    type: String,
    required: [true, "Please enter subject code"],
    unique: true,
  },
  faculty: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Subject", subjectModel);

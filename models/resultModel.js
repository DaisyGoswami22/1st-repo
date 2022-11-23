const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Types.ObjectId,
    ref: "Student",
    required: [true, "Please enter student id"],
  },
  semesters: [
    {
      semester: {
        semesterName: {
          type: String,
          required: [true, "Please eneter semester name"],
        },
        subjects: [
          {
            subject: {
              type: mongoose.Types.ObjectId,
              ref: "Subject",
              required: [true, "Please enter subject id"],
            },
            marks: {
              type: Number,
              required: [true, "Please enter marks for the subject"],
            },
          },
        ],
        SGPA: {
          type: Number,
          required: [true, "Please enter SGPA"],
        },
      },
    },
  ],
  preparedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Plese enter who prepared it"],
  },
});

module.exports = mongoose.model("Result", resultSchema);

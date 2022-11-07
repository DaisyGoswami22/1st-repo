const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  address: {
    type: String,
    required: [true, "Please enter your address"],
    maxLength: [30, "Address must be less than 30 characters"],
  },
  phone_no: {
    type: Number,
    required: [true, "Please enter your phone_no"],
    maxLength: 10,
    minLength: 10,
  },
  age: {
    type: Number,
    required: [true, "Please enter your age"],
    maxLength: 2,
  },
  email: {
    type: String,
    required: [true, "Enter your email id"],
  },
  password: {
    type: String,
    required:[true, "Enter your password"],
    minLength: [8,"Password must be more than 8 characters"],
  },
  DOB: {
    type: Date,
    required: [true, "Enter your date of birth"],
  },
  semester: [
    {
      semester_name: {
        type: String,
        required: [true, "Please enter semester name"],
      },
      result: [
        {
          subject: [
            {
              subject_name: {
                type: String,
                required: [true, "Please enter the subject name"],
              },
              marks: {
                type: Number,
                maxLength: 3,
              },
            },
          ],
        },
      ],
    },
  ],
  resetPasswordToken: String,
    resetPasswordExpire: Date,
});

studentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  // JSON Web Token
  studentSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  
  // compare password
  studentSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // Generating Password Reset Token
  studentSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hashing and adding resetPasswordToken to studentSchema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
    return resetToken;
  };

module.exports = mongoose.model("Student", studentSchema);
const express = require("express");
const cors = require("cors");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routes
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const resultRoutes = require("./routes/resultRoutes");

app.use("/api/v1", userRoutes);
app.use("/api/v1", studentRoutes);
app.use("/api/v1", subjectRoutes);
app.use("/api/v1", resultRoutes);

// middleware for error
app.use(errorMiddleware);

module.exports = app;

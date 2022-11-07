const express = require("express");
const cors = require("cors");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// route imports
// const users = require("./routes/user/userRoutes"); 

const student = require("./routes/studentRoutes");

// app.use("/api/v1", users);

app.use("/api/v1", student);



// middleware for error
app.use(errorMiddleware);

module.exports = app;

const express = require("express");
const cors = require("cors");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// route imports
const users = require("./routes/user/userRoutes");

app.use("/api/v1", users);

// middleware for error
app.use(errorMiddleware);

module.exports = app;

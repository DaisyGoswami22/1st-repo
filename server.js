const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// uncaughtException
process.on("uncaughtException", (err) => {
  console.log("Error: " + err.message);
  console.log("Shutting down the server due to uncaughtException");
  process.exit(1);
});

// config
dotenv.config({ path: "config/config.env" });

// database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Running at http://localhost:${process.env.PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log("Error: " + err.message);
  console.log("Shutting down the server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});

require("dotenv").config();
const express = require("express");
const morgan = require("morgan")

const app = express();
app.use(morgan(process.env.NODE_ENV === "production" ? 'tiny' : 'dev'));

app.use(express.json())

const ApiError = require("./utils/ApiError");
const ApiResponse = require("./utils/ApiResponse");

const authRoute = require("./routes/auth.route")

const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

app.get("/", (req, res) => {
  res.send("Express server is working!");
});
//health check server
app.get("/api/v1/health-check", (req, res) => {
  try {
    const healthData = {
      message: "sever health is good",
      timestamp: new Date().toISOString(),
    };
    const response = new ApiResponse(200, healthData, "Success");
    return res.status(200).json(response);
  } catch (error) {
    throw new Error("Server Health issue", error);
  }
});

//test error handler
app.get("/api/v1/error-test", (req, res) => {
  try {
    const error = new ApiError(400, "Custom Api Error working");
    res.status(400).json(error);
  } catch (error) {
    throw new Error("failed to Apierror", error);
  }
});


app.use("/api/v1/auth", authRoute)


app.use(notFound);
app.use(errorHandler);

module.exports = app;

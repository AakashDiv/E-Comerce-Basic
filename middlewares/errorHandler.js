const ApiError = require("../utils/ApiError");

const errorHandler = async (error, req, res, next) => {
  console.error("errors log", error.message);
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message,
      status: error.statusCode,
      success: false,
    });
  }

  return res.status(500).json({
    message: "something went wrong",
    status: 500,
    success: false,
  });
};

module.exports = errorHandler;

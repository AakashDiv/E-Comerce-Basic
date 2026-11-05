const ApiError = require("../utils/ApiError");

const errorHandler = async (error, req, res, next) => {
  console.log(error);
  if (error instanceof ApiError) {
    return res.status(error.status).json({
      message: error.message,
      status: error.statuCode,
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

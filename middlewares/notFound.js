const notFound = async (req, res, next) => {
  res.status(404).json({
    message: "route not found",
    success: false,
    status: 404,
  });
};

module.exports = notFound;

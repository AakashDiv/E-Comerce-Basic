class ApiError extends Error {
  constructor(statuCode, message) {
    super(message);
    this.statuCode = statuCode;
  }
}

module.exports = ApiError;

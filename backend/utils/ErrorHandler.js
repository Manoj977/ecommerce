class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    //it gives stack property we can find what kind of error which place is occur
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;

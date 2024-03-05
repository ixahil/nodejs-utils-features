import CustomError from "../utils/CustomError.js";

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error!";

  // Mongoose Duplicate Entry Error
  if (err.code === 11000) {
    const message = `Already Exist ${Object.keys(
      err.keyValue
    )}: ${Object.values(err.keyValue)}`;
    err = new CustomError(message, 400);
  }

  // Mongoose Validation Error - when no data provided
  if (err.name === "ValidationError") {
    const message = `Please fill the required fields: ${Object.keys(
      err.errors
    )}`;
    err = new CustomError(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is Invalid, you are unauthorized to access`;
    err = new CustomError(message, 401);
  }

  return res.status(err.statusCode).json({
    status: err.statusCode,
    success: false,
    message: err.message,
  });
};

export default errorHandler;

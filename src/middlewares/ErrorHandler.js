import AppError from "../utils/AppError.js";

// Error Handlers
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  err.isOperational = err.isOperational || true;

  // Mongoose Cast Error
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}: ${err.value}`;
    err = new AppError(message, 400);
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((err) => err.message);

    const message = `Invalid input data. ${errors.join(". ")}`;

    err = new AppError(message, 400);
  }

  // Duplicate Mongoose Error E11000
  if (err.code === 11000) {
    const message = `Duplicate field value: ${Object.keys(
      err.keyValue
    )} : ${Object.values(err.keyValue)}. Please try again!`;
    err = new AppError(message, 400);
  }

  // JWT Error
  if (err.name === "JsonWebTokenError") {
    err = new AppError(
      "Token Malfunctioned, you are not allowed to access, Login again!",
      401
    );
  }

  return res.status(err.statusCode).json({
    status: err.statusCode,
    success: false,
    message: err.message,
  });
};

export default errorHandler;

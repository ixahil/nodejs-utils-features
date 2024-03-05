import jwt from "jsonwebtoken";
import CustomError from "./CustomError.js";

const secret = "secret";

export const generateToken = (userData) => {
  return jwt.sign({ email: userData.email, _id: userData._id }, secret);
};

export const verifyToken = (token) => {
  const decoded = jwt.verify(token, secret);
  if (!decoded)
    throw new CustomError("JWT Malfunctioned, you are not authenticated", 401);
  return decoded;
};

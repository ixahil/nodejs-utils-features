import { verifyToken } from "../utils/jwt.js";
import { catchAsyncErrors } from "./asyncErrorHandler.js";

export const authenticate = catchAsyncErrors(async (req, res, next) => {
  const { access_token } = req.cookies;
  const userData = verifyToken(access_token);
  req.body.user = userData;
  next();
});

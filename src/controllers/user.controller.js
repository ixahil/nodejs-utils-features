import catchAsyncErrors from "../middlewares/asyncErrorHandler.js";
import { UserModel } from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const user = await UserModel.createNewUser(req.body);
  res.status(201).json({
    success: true,
    data: {
      user,
    },
  });
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const user = await UserModel.loginUser(req.body);
  const access_token = generateToken(user);
  res.status(200).json({
    success: true,
    data: {
      user,
    },
    access_token,
  });
});

export const getUserInfo = catchAsyncErrors(async (req, res, next) => {
  const userInfo = await UserModel.getUserInfo(req.body.user._id);
  res.status(200).json({
    success: true,
    data: {
      userInfo,
    },
  });
});

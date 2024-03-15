import { catchAsyncErrors } from "../middlewares/asyncErrorHandler.js";
import UserModel from "../models/User.model.js";
import { generateToken, sendToken } from "../utils/jwt.js";

const register = catchAsyncErrors(async (req, res, next) => {
  const user = await UserModel.CreateUser(req.body);
  res.status(201).json({
    message: "Register Successfully",
    user,
  });
});

const login = catchAsyncErrors(async (req, res, next) => {
  const user = await UserModel.LoginUser(req.body);
  const access_token = sendToken(user, res);
  res.status(200).json({
    message: "Login Successfully",
    user,
    access_token,
  });
});

const getUser = catchAsyncErrors(async (req, res, next) => {
  const { _id } = req.body.user;
  const user = await UserModel.findById(_id);
  res.status(200).json({
    user,
  });
});

export { register, login, getUser };

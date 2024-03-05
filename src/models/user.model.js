import { Schema, model } from "mongoose";
import CustomError from "../utils/CustomError.js";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Register
UserSchema.statics.createNewUser = async function (userData) {
  const salt = await bcrypt.genSalt(10); // Generate a salt for the user's password
  const hash = await bcrypt.hash(userData.password, salt);
  return await this.create({
    email: userData.email,
    password: hash,
  });
};

// Login
UserSchema.statics.loginUser = async function (userData) {
  // Find user
  const user = await this.findOne({
    email: userData.email,
  });
  if (!user) throw new CustomError("Invalid Creds!", 401);
  // Compare password
  const comparePassword = await bcrypt.compare(
    userData.password,
    user.password
  );
  if (!comparePassword) throw new CustomError("Invalid Creds!", 401);
  return user;
};

// GET User Info
UserSchema.statics.getUserInfo = async function (id) {
  return await this.findById(id, "-password");
};

export const UserModel = model("User", UserSchema);

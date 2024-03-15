import { Schema, model } from "mongoose";
import AppError from "../utils/appError.js";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a valid Name"],
  },
  email: {
    type: String,
    required: [true, "Please enter a valid email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a valid Password"],
  },
});

// statics -- only on collections

UserSchema.pre("save", async function (next) {
  if (this.password) {
    var salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hashSync(this.password, salt);
  }
  next();
});

UserSchema.statics.CreateUser = async function (data) {
  return await this.create(data);
};

UserSchema.statics.LoginUser = async function (data) {
  const user = await this.findOne({ email: data.email });

  if (!user) {
    throw new AppError("Invalid username or password", 401);
  }

  await user.comparePassword(data.password);

  // If the password is correct, you can return the user or do any other operations here
  return user;
};

// Methods -- only run on documents

UserSchema.methods.comparePassword = async function (userPassword) {
  const isPasswordCorrect = await bcrypt.compare(userPassword, this.password);
  if (!isPasswordCorrect) {
    throw new AppError("Invalid username or password", 401);
  }
  return;
};

const UserModel = model("User", UserSchema);

export default UserModel;

import jwt from "jsonwebtoken";

const secret = "secret";

export const generateToken = (user) => {
  return jwt.sign({ _id: user._id }, secret);
};

export const sendToken = (user, res) => {
  const token = jwt.sign({ _id: user._id }, secret, { expiresIn: "1h" });
  res.cookie("access_token", token, {
    expires: new Date(Date.now() + 86400000),
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 86400000,
  });
  return token;
};

export const verifyToken = function (token) {
  return jwt.verify(token, secret);
};

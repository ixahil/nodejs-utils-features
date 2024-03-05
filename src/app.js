import express from "express";
import logger from "morgan";
import userRouter from "./routes/user.routes.js";
import errorHandler from "./middlewares/ErrorHandler.js";
import cookieParser from "cookie-parser";

const app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

// Public folder
app.use(express.static("./src/public"));

//Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1", userRouter);

// Static files
app.get("/", (req, res, next) => {
  res.render("pages/index");
});

// Error Handling
app.use(errorHandler);

export default app;

import cookieParser from "cookie-parser";
import express from "express";
import errorHandler from "./middlewares/ErrorHandler.js";
import UserRouter from "./routes/user.routes.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static("./src/public"));

// Middlwares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// static routes
app.get("/", (req, res, next) =>
  res.render("pages/index", { uri: req.originalUrl })
);

// Routes
app.use("/api/v1", UserRouter);

// Error Handler
app.use(errorHandler);

export default app;

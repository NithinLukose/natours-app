const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

const app = express();

//security headers
app.use(helmet());
//middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//rate limiter
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many  requests from this IP, please try again in an hour",
});
app.use("/api", limiter);

//body parser
app.use(express.json());

//data sanitization against nosql query injection
app.use(mongoSanitize());

//data sanitization again XSS attacks
app.use(xss());

//prevent parameter pollution
app.use(
  hpp({
    whitelist: ["duration"],
  })
);

//static files
app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.all("*", (req, res, next) => {
  const err = new AppError("cannot find url", 404);
  next(err);
});

app.use(globalErrorHandler);

module.exports = app;

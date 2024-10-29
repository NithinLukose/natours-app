const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../model/userModel");

const filterObj = (obj, ...allowFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "not ready",
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "not ready",
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "not ready",
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "not ready",
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "not ready",
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("cannot update password", 400));
  }

  const filteredBody = filterObj(req.body, "name", "email");
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
  });
});

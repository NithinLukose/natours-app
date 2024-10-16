const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "provide valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "confirm password is required"],
    minlength: 8,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const Joi = require("joi");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  resetToken: {
    type: String,
  },
});

const User = new mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    resetToken: Joi.string(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;

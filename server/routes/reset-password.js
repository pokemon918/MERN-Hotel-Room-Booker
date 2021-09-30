const { User, validate } = require("../models/user");
const jwt = require("jsonwebtoken");
const express = require("express");
const Joi = require("joi");
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcrypt");

require("dotenv").config();

router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("invalid reset-token detected");
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  user.resetToken = null;
  await user.save();
  res.send("Password Changed");
});

module.exports = router;

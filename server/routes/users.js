const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", auth, async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = jwt.sign(
    { _id: user._id, name: user.name, sub: user.email },
    process.env.JWT_KEY
  );

  // const token = user.generateAuthToken();
  //   res.send(_.pick(user, ["_id", "name", "email", "password"]));
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;

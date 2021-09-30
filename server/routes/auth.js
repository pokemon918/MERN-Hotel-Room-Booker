const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Incorrect Password");

  // const token = user.generateAuthToken();
  const token = jwt.sign(
    { _id: user._id, name: user.name, sub: user.email },
    process.env.JWT_KEY
  );
  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(req);
}
module.exports = router;

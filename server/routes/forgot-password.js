const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const express = require("express");
const Joi = require("joi");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid User Email");
  const token = jwt.sign(
    {
      iss: "password-reset-workflow",
      sub: user.email,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    process.env.JWT_KEY
  );
  user.resetToken = token;

  await user.save();

  const msg = {
    to: user.email,
    from: "krishnanvenkat4@gmail.com", // Use the email address or domain you verified above
    subject: "Sending with Twilio SendGrid is Fun",
    text: `Hello, thanks for registering on our site.
      Please copy and paste the address below to reset your password.
      http://localhost:3000/reset-password/${user.resetToken}`,
    html: `<h1>Hello,</h1>
      <p>thanks for refistering on our site.</p>
      <p>Please click the link below to reset your password.</p>
      <a href="http://localhost:3000/reset-password/${user.resetToken}">Reset Your password</a>`,
  };

  (async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();

  await user.save();

  res.send("reset the password by clicking the link sent to your email");
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
  });
  return schema.validate(req);
}

module.exports = router;

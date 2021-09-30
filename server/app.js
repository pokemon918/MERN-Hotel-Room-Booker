const rooms = require("./routes/rooms");
const bookings = require("./routes/bookings");
const forgotpassword = require("./routes/forgot-password");
const resetpassword = require("./routes/reset-password");
const auth = require("./routes/auth");
const users = require("./routes/users");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error :"));
db.once("open", function () {
  console.log("connected to database");
});

app.use(cors());
app.use(express.json());
app.use("/api/rooms", rooms);
app.use("/api/bookings", bookings);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/forgot-password", forgotpassword);
app.use("/api/reset-password", resetpassword);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));

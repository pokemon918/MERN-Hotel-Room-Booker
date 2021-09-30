const auth = require("../middleware/auth");
const { Room } = require("../models/room");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const rooms = await Room.find().sort("name");
  res.send(rooms);
});

router.get("/:id", async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (!room) return res.status(404).send("Room not Found");
  res.send(room);
});

router.post("/", auth, async (req, res) => {
  let room = new Room({
    name: req.body.name,
    maxcount: req.body.maxcount,
    phonenumber: req.body.phonenumber,
    rentperday: req.body.rentperday,
    imageurls: req.body.imageurls,
    currentbookings: [],
    type: req.body.type,
    description: req.body.description,
  });
  room = await room.save();
  res.send("Room Added To The DataBase");
});
module.exports = router;

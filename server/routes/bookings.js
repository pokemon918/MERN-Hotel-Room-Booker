const auth = require("../middleware/auth");
const { Booking } = require("../models/booking");
const { Room } = require("../models/room");
const express = require("express");
const router = express.Router();
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.get("/", auth, async (req, res) => {
  const bookings = await Booking.find().sort("name");
  res.send(bookings);
});

router.get("/:id", auth, async (req, res) => {
  const userId = req.params.id;
  const booking = await Booking.find({ userId: userId });
  if (!booking) return res.status(404).send("Bookings not Found");
  res.send(booking);
});

router.post("/", auth, async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      email: req.body.token.email,
      source: req.body.token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        customer: customer.id,
        currency: "inr",
        receipt_email: req.body.token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      let booking = new Booking({
        name: req.body.name,
        room: req.body.room,
        roomId: req.body.roomId,
        userId: req.body.userId,
        fromDate: moment(req.body.fromDate).format("DD-MM-YYYY"),
        toDate: moment(req.body.toDate).format("DD-MM-YYYY"),
        totalAmount: req.body.totalAmount,
        totalDays: req.body.totalDays,
        transactionId: uuidv4(),
        status: req.body.status,
      });

      booking = await booking.save();

      const roomtemp = await Room.findOne({ _id: req.body.roomId });

      roomtemp.currentbookings.push({
        bookingId: booking._id,
        name: booking.name,
        fromDate: moment(req.body.fromDate).format("DD-MM-YYYY"),
        toDate: moment(req.body.toDate).format("DD-MM-YYYY"),
        userId: booking.userId,
        status: booking.status,
      });

      await roomtemp.save();
    }

    res.send("Payment Successfull, Your Room is Booked");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/cancel-booking", auth, async (req, res) => {
  const { bookingId, roomId } = req.body;
  try {
    const booking = await Booking.findOne({ _id: bookingId });
    booking.status = "cancelled";

    await booking.save();

    const room = await Room.findOne({ _id: roomId });
    const bookings = room.currentbookings;

    const temp = bookings.filter(
      (booking) => booking.bookingId.toString() !== bookingId
    );
    room.currentbookings = temp;

    await room.save();

    res.send("Your Booking Cancelled Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;

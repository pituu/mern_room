const express = require("express");
const bookingModel = require("../models/bookingmodel");
const roommodel = require("../models/rooms");
const router = express.Router();
const Razorpay = require("razorpay");
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_ID_KEY,
  key_secret: RAZORPAY_SECRET_KEY,
});
// const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");
// const moment = require("moment");
// const stripe = require("stripe")(
//   "sk_test_51IYnC0SIR2AbPxU0EiMx1fTwzbZXLbkaOcbc2cXx49528d9TGkQVjUINJfUDAnQMVaBFfBDP5xtcHCkZG1n1V3E800U7qXFmGf"
// );

router.post("/bookroom", async (req, res) => {
  const { room, roomid, userid, fromdate, todate, totalDays, totalAmount } =
    req.body.userbooking;
  try {
    const amount = totalAmount * 100;
    const options = {
      amount: amount,
      currency: "INR",
      receipt: "razorUser@gmail.com",
    };

    razorpayInstance.orders.create(options, (err, order) => {
      if (!err) {
        res.status(200).send({
          success: true,
          msg: "Order Created",
          order_id: order.id,
          amount: amount,
          key_id: RAZORPAY_ID_KEY,
          product_name: room,
          roomid,
          todate,
          fromdate,
          totalDays,
          user: userid,
        });
      } else {
        res.status(400).send({ success: false, msg: "Something went wrong!" });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
  //   console.log(req.body.userbooking);
  //   const  transactionId='1234';
  //   const newbooking= new bookingModel({room,roomid,userid,fromdate,todate,totalDays,totalAmount,transactionId});
  //   try {
  //     const booking=await newbooking.save();

  //     const room=await roommodel.findOne({_id:booking.roomid});
  //     console.log(room);
  //     room.currentbookings.push({bookingid:booking._id,todate,fromdate,userid,status:booking.status});
  //     await room.save();
  //     res.send({'message':'booking saved successfully'});
  //   } catch (error) {
  //     return res.status(400).json({'message':error});
  // }
});
router.post("/savebooking", async (req, res) => {
  const {
    room,
    roomid,
    userid,
    fromdate,
    todate,
    totalDays,
    totalAmount,
    paymentid,
  } = req.body;
  const transactionId = paymentid;
  const newbooking = new bookingModel({
    room,
    roomid,
    userid,
    fromdate,
    todate,
    totalDays,
    totalAmount,
    transactionId,
  });
  try {
    const booking = await newbooking.save();

    const room = await roommodel.findOne({ _id: booking.roomid });
    console.log(room);
    room.currentbookings.push({
      bookingid: booking._id,
      todate,
      fromdate,
      userid,
      status: booking.status,
    });
    await room.save();
    res.send({ message: "booking saved successfully" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;
  try {
    const fetchedbooking = await bookingModel.findOne({ _id: bookingid });
    fetchedbooking.status = "cancelled";
    await fetchedbooking.save();
    const fetchedroom = await roommodel.findOne({ _id: roomid });
    const savedbookings = fetchedroom.currentbookings;
    const temp = savedbookings.filter(booking => {
      booking.bookingid.toString() != bookingid;
    });
    fetchedroom.currentbookings = temp;
    await fetchedroom.save();
    res.send({ message: "room cancelled successfully" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getuserbookings", async (req, res) => {
  const { id } = req.body;
  try {
    const bookings = await bookingModel.find({ userid: id }).sort({ _id: -1 });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await bookingModel.find({});
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;

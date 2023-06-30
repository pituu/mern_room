const express = require("express");
const roommodel = require("../models/rooms");
const router = express.Router();

router.get("/getallrooms", async (req, res) => {
  try {
    const Rooms = await roommodel.find();
    return res.send(Rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
router.post("/getroombyid", async (req, res) => {
  const id = req.body.roomid;
  try {
    const Room = await roommodel.findOne({ _id: id });
    return res.send(Room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
router.post("/addroom", async (req, res) => {
  const {
    name,
    rentperday,
    maxcount,
    description,
    phonenumber,
    type,
    imageURL1,
    imageURL2,
    imageURL3
  } = req.body;

  const newroom = new roommodel({
    name,
    rentperday,
    maxcount,
    description,
    phonenumber,
    type,
    imageurls: [imageURL1, imageURL2, imageURL3],
    currentbookings: [],
  });
  try {
    await newroom.save();
    res.send("New Room Added Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});
module.exports = router;

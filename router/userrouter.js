const express = require("express");
const usermodel = require("../models/usermodel");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body.user;
  console.log(req.body);
  const newuser = new usermodel({
    name: name,
    email: email,
    password: password,
  });
  try {
    const user = await newuser.save();
    return res.send("user registered successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body.user;
  try {
    const user = await usermodel.findOne(
      { email: email, password: password },
      { password: 0, createdAt: 0, updatedAt: 0 }
    );

    return res.send(user);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
router.get("/getallusers", async (req, res) => {
  try {
    const alluser = await usermodel.find({});
    return res.send(alluser);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
router.post("/getuser", async (req, res) => {
  const email=req.body.email;
  try {
    const user = await usermodel.findOne({email});
    if(user){
    return res.send();}
    return res.send("user not found");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
module.exports = router;

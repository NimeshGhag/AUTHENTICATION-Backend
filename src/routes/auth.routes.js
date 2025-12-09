const express = require("express");
const JWT = require("jsonwebtoken");
const userModel = require("../models/user.model");
const router = express.Router();

// POST Method for /register API

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const isUserNmae = await userModel.findOne({
    username,
  });

  if (isUserNmae) {
    return res.status(409).json({
      message: "User Already Exists",
    });
  }

  const user = await userModel.create({
    username,
    password,
  });

  const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({
    message: "User Registered Successfully",
    user: user,
  });
});

module.exports = router;

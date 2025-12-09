const express = require("express");
const JWT = require("jsonwebtoken");
const userModel = require("../models/user.model");
const router = express.Router();

// POST Method for /register API ,/login API

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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username,
  });

  if (!user) {
    return res.status(404).json({
      message: "User account not found",
    });
  }

  const isPasswodValid = password === user.password;

  if (!isPasswodValid) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  res.status(200).json({
    message: "User login Successfully",
    user: user,
  });
});

// GET Method for /user [protected]

router.get("/user", async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized Token not found",
    });
  }

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    const user = await userModel
      .findOne({
        _id: decoded.id,
      })
      .select("-password -__v");

    return res.status(200).json({
      message: "User data Fetched successfully",
      user: user,
    });
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized Invalid Token",
    });
  }
});

module.exports = router;

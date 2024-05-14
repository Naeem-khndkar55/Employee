const express = require("express");
const User = require("../models/UserModels.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User Already Exist" }] });
    }
    const hashpassword = await bcrypt.hash(password, 12);

    const newUser = new User({ name, email, password: hashpassword });
    const result = await newUser.save();
    result._doc.password = undefined;

    return res.status(201).json({ success: true, ...result._doc });
  } catch (err) {
    res.status(500).json({ error: err.msg });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User is not Registered" }] });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).json({ errors: [{ msg: "Wrong Password" }] });
    }
    const key = process.env.SECRET_KEY;
    const token = jwt.sign({ _id: user._id }, key, { expiresIn: "10d" });
    user._doc.password = undefined;
    const isUser = { ...user._doc, password: undefined };
    return res.status(201).json({ success: true, isUser, token });
  } catch (err) {
    res.status(500).json({ error: err.msg });
  }
};

const authenticate = (req, res) => {
  return res.status(201).json({ success: true, user: { ...req.user._doc } });
};
module.exports = { register, login, authenticate };

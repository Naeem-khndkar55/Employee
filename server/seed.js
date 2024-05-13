const express = require("express");
const bcrypt = require("bcrypt");
const adminModel = require("./src/models/AdminModel.js");
const connectDB = require("./src/Config/db");

connectDB();
const adminAccount = async () => {
  try {
    const adminCount = await adminModel.countDocuments();
    if (adminCount === 0) {
      const hashPassword = await bcrypt.hash("adminpassword", 10);
      const newAdmin = new adminModel({
        email: "admin@gmail.com",
        password: hashPassword,
      });
      await newAdmin.save();
      console.log("account Created");
    } else {
      console.log("Account Already Exist");
    }
  } catch (error) {
    console.log(error);
  }
};
adminAccount();

const express = require("express");
const EmployeeModel = require("../models/EmployeeModels.js");

const createEmployee = async (req, res) => {
  try {
    const { name, email, designation, salary, starting, address, phone, dob } =
      req.body;

    const newEmployee = new EmployeeModel({
      name,
      email,
      designation,
      salary,
      starting,
      address,
      phone,
      dob,
      postedBy: req.user._id,
    });

    const savedEmployee = await newEmployee.save();

    res.status(201).json({ success: true, ...savedEmployee._doc });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const getEmployee = async (req, res) => {
  try {
    const employees = await EmployeeModel.find({ postedBy: req.user._id });
    res.status(201).json({ success: true, employees });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const getOneEmployee = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ success: false, message: "No User Id" });
  }
  try {
    const employees = await EmployeeModel.findOne({ _id: id });
    res.status(201).json({ success: true, ...employees._doc });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ success: false, message: "No User Id" });
  }
  try {
    const result = await EmployeeModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    res.status(201).json({ success: true, ...result._doc });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const deleteContact = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ success: false, message: "No User Id" });
  }
  try {
    const employee = await EmployeeModel.findOne({ _id: id });
    if (!employee) {
      return res
        .status(401)
        .json({ success: false, message: "No Record exist" });
    }
    const deleteEmployee = await EmployeeModel.findByIdAndDelete({ _id: id });
    const employees = await EmployeeModel.find({ postedBy: req.user._id });
    return res.status(201).json({ success: true, employees });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  createEmployee,
  getEmployee,
  getOneEmployee,
  updateEmployee,
  deleteContact,
};

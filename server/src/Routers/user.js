const express = require("express");

const Controller = require("../controller/UserController.js");

const { body } = require("express-validator");
const router = express.Router();

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("name should not be empty"),
    body("email").trim().notEmpty().withMessage("email should not be empty"),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("password should not be empty")
      .isLength({ min: 5 })
      .withMessage("password must be atleast 5 character"),
  ],
  Controller.register
);
router.post(
  "/login",
  [
    body("email").trim().notEmpty().withMessage("email should not be empty"),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("password should not be empty")
      .isLength({ min: 5 })
      .withMessage("password must be atleast 5 character"),
  ],
  Controller.login
);
// Export the router
module.exports = router;

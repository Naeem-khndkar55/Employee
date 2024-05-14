const express = require("express");

const Controller = require("../controller/UserController.js");
const Employee = require("../controller/EmployeeController.js");
const multer = require("multer");
const path = require("path");
const { body } = require("express-validator");
const router = express.Router();
const VarifyUser = require("../midelware/VarifyUser");

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

router.get("/verify", VarifyUser, Controller.authenticate);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../../public/image")); // Assuming 'public' is the static directory
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage: storage });

router.post("/addemployee", VarifyUser, Employee.createEmployee);
router.get("/employees", VarifyUser, Employee.getEmployee);
router.get("/employee/:id", VarifyUser, Employee.getOneEmployee);
router.put("/updateemployee/:id", VarifyUser, Employee.updateEmployee);
router.delete("/employee/:id", VarifyUser, Employee.deleteContact);

// Export the router
module.exports = router;

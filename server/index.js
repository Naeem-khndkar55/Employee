const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const connectDB = require("./src/Config/db.js");
const UserRouter = require("./src/Routers/user.js");

require("dotenv").config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],

    credentials: true,
  })
);
app.use(cookieparser());
connectDB();

app.use("/auth", UserRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

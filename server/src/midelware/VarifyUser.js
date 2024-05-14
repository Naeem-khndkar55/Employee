const jwt = require("jsonwebtoken");
const User = require("../models/UserModels.js");
require("dotenv").config();
const VarifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const key = process.env.SECRET_KEY;
    jwt.verify(token, key, async (err, payload) => {
      try {
        if (err) {
          return res.status(400).json({ error: "unauthorized" });
        }
        const user = await User.findOne({ _id: payload._id }).select(
          "-password"
        );
        req.user = user;
        next();
      } catch (err) {
        return res.status(403).json({ error: err.msg });
      }
    });
  } else {
    return res.status(403).json({ error: "Forbidden" });
  }
};
module.exports = VarifyUser;

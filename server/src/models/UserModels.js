const mongoose = require("mongoose");

UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,

  role: {
    type: String,
    default: "citizen"
  }
});

module.exports = mongoose.model("User", UserSchema);
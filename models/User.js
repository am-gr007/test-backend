const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: 3,
      maxlength: 40,
    },
    dob: {
      type: Date,
      required: [true, "Please provide a date"],
      default: Date.now,
    },
    address: {
      type: String,
      required: [true, "Please provide a address"],
      minlength: 5,
      maxlength: 50,
    },
    description: {
      type: String,
      minlength: 3,
      maxlength: 30,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

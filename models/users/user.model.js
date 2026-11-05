const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role:{
      type:String,
      enum: ["customer", "vendor", "admin"],
      default:"customer"
    }
  },
  { timestamp: true },
);

const users = mongoose.model("Users", userSchema);

module.exports = users;

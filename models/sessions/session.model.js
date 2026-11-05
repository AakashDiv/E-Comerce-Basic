const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    refreshToken: {
      type: String,
      required: true,
    },
    expiredAt: {
      type: Date,
      required: true,
    },
    isRevoked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamp: true },
);

const sessions = mongoose.model("Sessions", sessionSchema);

module.exports = sessions;

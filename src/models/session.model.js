const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      valid: { type: Boolean, default: true }, 
    },
    {
      timestamps: true,
    }
  );

  const SessionModel = mongoose.model("Session", sessionSchema);

  module.exports = SessionModel

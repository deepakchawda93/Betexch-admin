const mongoose = require("mongoose");

const userSessionSchema = new mongoose.Schema({
  matchId: { type: String, required: true },
  marketId: { type: String, required: true },
  favTeamName: { type: String, required: true },
  sessionId: {type: String, required: true},
  b1: { type: String, required: true }, //lgai
  l1: { type: String, required: true }, //khai
  bs1: { type: String, required: true }, //lgai rate
  ls1: { type: String, required: true }, //khai rate
  teamMinRate: { type: Number },
  teamMaxRate: { type: Number },
  sessionStatus:{type : String},
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSessionSchema.set("timestamps", true);
module.exports = mongoose.model("userSessions", userSessionSchema);

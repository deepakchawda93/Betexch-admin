const mongoose = require("mongoose");

const sessionbetSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  marketId: { type: String, required: true },
  matchId: { type: String, required: true },
  sessionName: { type: String, required: true },
  yesRun: { type: String, required: true }, //lgai
  yesRate: { type: String, required: true },
  noRun: { type: String, required: true }, //khai
  noRate: { type: String, required: true },
  decision: { type: Number, default: null },
  sessionMinRate: { type: Number },
  sessionMaxRate: { type: Number },
  sessionStatus: { type: String, default: null },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

sessionbetSchema.set("timestamps", true);
module.exports = mongoose.model("sessions", sessionbetSchema);

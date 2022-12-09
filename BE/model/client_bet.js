const mongoose = require("mongoose");

const clientBetSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  matchId: { type: String, required: true },
  marketId: { type: String, required: true },
  teamName: { type: String, required: true },
  marketName: { type: String, required: true },
  marketType: { type: String },
  isKhai: { type: Boolean, required: true },
  // isLagai: { type: Boolean, required: true },
  stack: { type: String, required: true },
  odds: { type: String, required: true },
  profit: { type: String, required: true },
  loss: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

});

clientBetSchema.set("timestamp", "true");
module.exports = mongoose.model("clientBet", clientBetSchema);

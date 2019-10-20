const mongoose = require("mongoose");

const bidSchema = mongoose.Schema({
  price: { type: Number, required: true },
  title: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ideaId: { type: mongoose.Schema.Types.ObjectId, ref: "Idea", required: true },
  bidderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  approval: {
    type: Number, default: 0, min: 0, max: 2  // 1 is approval, 2 is rejection, 0 is no response from hack developers
  }
});

module.exports = mongoose.model("Bid", bidSchema);

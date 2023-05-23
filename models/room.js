const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  consumption: {
    type: Number,
    default: 0,
  },
  monthlyCost: {
    type: Number,
    default: 0.00,
  },
  home: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
    required: true,
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;

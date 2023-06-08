const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  appliances: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appliance"
    }
  ],
  home: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
    required: true,
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;

const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
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
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room"
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Home = mongoose.model("Home", homeSchema);

homeSchema.methods.addRoom = async function (roomId) {
  this.rooms.push(roomId);
  await this.save();
};

module.exports = Home;

const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  type: {
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Home = mongoose.model("Home", homeSchema);

module.exports = Home;

const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Home = mongoose.model("Home", homeSchema);

module.exports = Home;

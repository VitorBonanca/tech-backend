const mongoose = require("mongoose");
const appliancesEnum = require("../enums/appliances");

const applianceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: Object.values(appliancesEnum).map(value => value.Name),
    required: true,
  },
  image: {
    type: String,
    enum: Object.values(appliancesEnum).map(value => value.Image),
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  power: {
    type: Number,
    default: 0,
    required: true,
  },
  usageDuration: {
    type: Number,
    default: 0,
    required: true,
  },
  usageFrequency: {
    type: Number,
    default: 0,
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
});

const Appliance = mongoose.model("Appliance", applianceSchema);

module.exports = Appliance;

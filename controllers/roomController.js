const Room = require("../models/room");
const Home = require("../models/home");
const User = require("../models/user");
const Appliance = require("../models/appliance");
const ApplianceCalculator = require("../models/applianceCalculator");
const RoomCalculator = require("../models/roomCalculator");
const mongoose = require("mongoose");

const addRoom = async (req, res) => {
  const { type, description } = req.body;
  const homeId = req.params.homeId;

  if (!type || !description) {
    console.log("Fill empty fields");
  } else {
    try {
      const room = new Room({
        type,
        description,
        home: homeId
      });
      
      const savedRoom = await room.save();

      const home = await Home.updateOne({
        _id: homeId
      }, {
        $push: { rooms:savedRoom._id }
      })
    
      res.redirect(`/home/view/${homeId}`);

    } catch (error) {
      console.log(error);
      res.status(500).send("Ocorreu um erro ao adicionar o cômodo.");
    }
  }
};

const roomView = async (req, res) => {
  
  const id = req.params.id;
  const room = await Room.findById(id).populate("appliances");
  const appliancesEnum = require("../enums/appliances");

  room.consumption = RoomCalculator.calculateConsumption(room);

  try {
    const appliances = await Appliance.find({ room });
    const home = await Home.findById(room.home);
    const user = await User.findById(home.user);

    const totalAppliances = appliances.length;

    room.monthlyCost = RoomCalculator.calculateMonthlyCost(room, home.rate);

    for (const appliance of appliances) {
      appliance.consumption = ApplianceCalculator.calculateConsumption(appliance);
      appliance.monthlyCost = ApplianceCalculator.calculateMonthlyCost(appliance, home.rate);
    }

    res.render("room", {
      user: { 
        name: user.name,
      },
      home: {
        id: home.id,
        description: home.description,
      },
      room,
      appliances,
      appliancesEnum,
      totalAppliances
    });
  } catch (error) {
      console.log(error);
      res.status(500).send("Ocorreu um erro ao exibir o painel do cômodo.");
  }
};

const roomUpdate = async (req, res) => {
  const id = req.params.id;

  const room = await Room.findById(id).populate("appliances");

  const { type } = req.body;
  let updateObj = {};
  if (type) updateObj.type = type;

  if (Object.keys(updateObj).length === 0) {
    console.log("No fields provided for update");
  } else {
    try {
      const savedRoom = await Room.updateOne({ _id: id }, { $set: updateObj });

      res.render("room", {
        user: { 
          name: "Usuario"
        },
        room: savedRoom,
      });
    } catch (error) {
      console.error("Update failed: ", error);
    }
  }
}

module.exports = {
  addRoom,
  roomView,
  roomUpdate,
};
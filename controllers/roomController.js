const Room = require("../models/room");
const Home = require("../models/home");
const Appliance = require("../models/appliance")
const mongoose = require("mongoose");

const addRoom = async (req, res) => {
  const { type } = req.body;
  const homeId = req.params.homeId;

  try {
    const room = new Room({
      type,
      home: homeId
    });
    
    const savedRoom = await room.save();

    const home = await Home.updateOne({
      _id: homeId
    }, {
      $push: { rooms:savedRoom._id }
    })
  
    res.redirect(`/home/update/${homeId}`);

  } catch (error) {
    console.log(error);
    res.status(500).send("Ocorreu um erro ao adicionar o cômodo.");
  }
};

// const showRooms = async (req, res) => {
//   try {
//     const rooms = await Room.find({ home: req.user._id });

//     res.render(`home/update/${homeId}`, { rooms });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Ocorreu um erro ao exibir os cômodos.");
//   }
// };


const roomView = async (req, res) => {
  const id = req.params.id;

  const room = await Room.findById(id).populate("appliances");

  try {
    const appliances = await Appliance.find({ room });
    res.render("room", {
      user: { 
        name: "Usuario"
      },
      room,
      appliances
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
  // showRooms,
  roomView,
  roomUpdate,
};
const Room = require("../models/room");
const Home = require("../models/home");
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

module.exports = {
  addRoom,
  // showRooms,
};
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

module.exports = {
  addRoom
};
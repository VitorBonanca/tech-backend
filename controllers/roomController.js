const Room = require("../models/room");
const Home = require("../models/home");
const mongoose = require("mongoose");

const addRoom = async (req, res) => {
  const { type } = req.body;
  try {
    const room = new Room({
      type,
      home: req.home._id
    });

    const savedRoom = await room.save();

    const home = await Home.updateOne({
      _id: req.home._id,
    }, {
      $push: { rooms:savedRoom._id }
    })
  
    res.redirect("/dashboard");

  } catch (error) {
    console.log(error);
    res.status(500).send("Ocorreu um erro ao adicionar o cômodo.");
  }
};

module.exports = {
  addRoom
};
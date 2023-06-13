const Home = require("../models/home");
const User = require("../models/user");
const Room = require("../models/room");
const Appliance = require("../models/appliance");
const RoomCalculator = require("../models/roomCalculator");
const HomeCalculator = require("../models/homeCalculator");
const mongoose = require("mongoose");

const addHome = async (req, res) => {
  const { type, description, rate } = req.body;

  if (!type || !description || !rate) {
    console.log("Fill empty fields");
  } else {
    try {
      const home = new Home({
        type,
        description,
        rate,
        user: req.user._id
      });

      const savedHome = await home.save();

      const user = await User.updateOne({
        _id: req.user._id,
      }, {
        $push: { homes:savedHome._id }
      })
    
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocorreu um erro ao adicionar a casa.");
    }
  }
};

const homeView = async (req, res) => {

  const id = req.params.id;
  const home = await Home.findById(id).populate({
    path: "rooms",
    populate: {
      path: "appliances",
    },
  });

  home.consumption = HomeCalculator.calculateConsumption(home);

  try {
    // const rooms = await Room.find({ home });
    const rooms = home.rooms;
    const user = await User.findById(home.user);

    const totalRooms = rooms.length;

    home.monthlyCost = HomeCalculator.calculateMonthlyCost(home, home.rate);

    for (const room of rooms) {
      room.consumption = RoomCalculator.calculateConsumption(room);
      room.monthlyCost = RoomCalculator.calculateMonthlyCost(room, home.rate);
    }

    res.render("home", {
      user: { 
        name: user.name,
      },
      home,
      rooms,
      totalRooms
    });
  } catch (error) {
      console.log(error);
      res.status(500).send("Ocorreu um erro ao exibir o painel da casa.");
    }  
};

const updateHome = async (req, res) => {
  
    const homeId = req.params.homeId;

  try {

    const home = await Home.findById(homeId);
    const user = await User.findById(home.user);

    if (!home) {
      return res.status(404).json({ error: 'Casa não encontrada.' });
    }

    home.description = req.body.description;
    home.rate = req.body.rate;
    
    await home.save();

    res.redirect("/dashboard");

  } catch (error) {
    console.error('Erro ao atualizar a casa:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }

};

const removeHome = async (req, res) => {

  const homeId = req.params.homeId;
  
  try {
    
    const home = await Home.findById(homeId);
    
    if (!home) {
      return res.status(404).send("Casa não encontrada.");
    }
        
    const user = await User.findById(home.user);
    const userId = user._id;
    const rooms = await Room.find({ home: homeId });

    for (const room of rooms) {
      await Appliance.deleteMany({ _id: { $in: room.appliances } });
    }
    
    await User.updateOne(
      { _id: userId },
      { $pull: { homes: homeId } }
    );

    await Room.deleteMany({ _id: { $in: home.rooms } });

      
    await Home.findByIdAndDelete(homeId);

    res.redirect("/dashboard");

  } catch (error) {
    console.log(error);
    res.status(500).send("Ocorreu um erro ao excluir a casa.");
  }

}

// const homeUpdate = async (req, res) => {
//   const id = req.params.id;

//   const home = await Home.findById(id).populate("rooms");

//   const { type, description, rate } = req.body;
//   let updateObj = {};
//   if (type) updateObj.type = type;
//   if (description) updateObj.description = description;
//   if (rate) updateObj.rate = rate;

//   if (Object.keys(updateObj).length === 0) {
//     console.log("No fields provided for update");
//   } else {
//     try {
//       const savedHome = await Home.updateOne({ _id: id }, { $set: updateObj });

//       res.render("home", {
//         user: { 
//           name: "Usuario"
//         },
//         home: savedHome,
//       });
//     } catch (error) {
//       console.error("Update failed: ", error);
//     }
//   }
// }

module.exports = {
  addHome,
  homeView,
  updateHome,
  removeHome,
  // homeUpdate,
};
const Home = require("../models/home");
const User = require("../models/user");
const Room = require("../models/room");
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

// const showHomes = async (req, res) => {
//   try {
//     const homes = await Home.find({ user: req.user._id });

//     res.render("dashboard", { homes });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Ocorreu um erro ao exibir as casas.");
//   }
// };

const homeView = async (req, res) => {
  const id = req.params.id;

  const home = await Home.findById(id).populate("rooms");

  try {
    const rooms = await Room.find({ home });
    res.render("home", {
      user: { 
        name: "Usuario"
      },
      home,
      rooms
    });
  } catch (error) {
      console.log(error);
      res.status(500).send("Ocorreu um erro ao exibir o painel da casa.");
    }  
};

const homeUpdate = async (req, res) => {
  const id = req.params.id;

  const home = await Home.findById(id).populate("rooms");

  const { type, description, rate } = req.body;
  let updateObj = {};
  if (type) updateObj.type = type;
  if (description) updateObj.description = description;
  if (rate) updateObj.rate = rate;

  if (Object.keys(updateObj).length === 0) {
    console.log("No fields provided for update");
  } else {
    try {
      const savedHome = await Home.updateOne({ _id: id }, { $set: updateObj });

      res.render("home", {
        user: { 
          name: "Usuario"
        },
        home: savedHome,
      });
    } catch (error) {
      console.error("Update failed: ", error);
    }
  }
}

module.exports = {
  addHome,
  // showHomes,
  homeView,
  homeUpdate,
};
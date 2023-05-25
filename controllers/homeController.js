const Home = require("../models/home");
const User = require("../models/user");
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

const showHomes = async (req, res) => {
  try {
    const homes = await Home.find({ user: req.user._id });

    res.render("dashboard", { homes });
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocorreu um erro ao exibir as casas.");
  }
};

const homeView = (req, res) => {
  res.render("home", {
  } );
}


module.exports = {
  addHome,
  showHomes,
  homeView
};
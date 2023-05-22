const Home = require("../models/home");
const User = require("../models/user");
const mongoose = require("mongoose");

const addHome = async (req, res) => {
  const { type, rate } = req.body;
  if (!type || !rate) {
    console.log("Fill empty fields");
  } else {
    try {
      const home = new Home({
        type,
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

module.exports = {
  addHome
};
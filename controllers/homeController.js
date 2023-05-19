const Home = require("../models/home");
const User = require("../models/user");
const mongoose = require("mongoose");

const addHome = async (req, res) => {
  const { type } = req.body;
 /* console.log(type);

  const home = new Home({
    type,
    user: req.user._id
  });

  console.log(home);
  const savedHome = await home.save();
  return res.send("Test")*/
  try {
    const home = new Home({
      type,
      user: req.user._id
    });

    const savedHome = await home.save();
//    const user = await User.findById(req.user._id);
//    await user.addHome(savedHome._id);
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
};

module.exports = {
  addHome
};
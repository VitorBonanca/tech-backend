const Home = require("../models/home");
const User = require("../models/user");

const addHome = async (req, res) => {
  const { type } = req.body;

  try {
    const home = new Home({
      type,
      user: req.user._id
    });

    const savedHome = await home.save();
    req.user.addHome(savedHome._id);
    await req.user.save();

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocorreu um erro ao adicionar a casa.");
  }
};

module.exports = {
  addHome
};
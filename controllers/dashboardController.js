const Home = require("../models/home");

//For Register Page
const dashboardView = async (req, res) => {
  try {
    const homes = await Home.find({ user: req.user._id });
    res.render("dashboard", {
        user: req.user,
        homes
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocorreu um erro ao exibir o painel de controle.");
  }  
};


  module.exports = {
    dashboardView
  };
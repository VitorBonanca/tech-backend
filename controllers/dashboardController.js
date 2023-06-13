const Home = require("../models/home");
const HomeCalculator = require("../models/homeCalculator");

const dashboardView = async (req, res) => {

  try {
    const homes = await Home.find({ user: req.user._id });

    const totalHomes = homes.length;

    // for (const home of homes) {
    //   home.consumption = HomeCalculator.calculateConsumption(home);
    //   home.monthlyCost = HomeCalculator.calculateMonthlyCost(home, rate);

    // }

    res.render("dashboard", {
        user: req.user,
        homes,
        totalHomes
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Ocorreu um erro ao exibir o painel de controle.");
  }  
};


  module.exports = {
    dashboardView
  };
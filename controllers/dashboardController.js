//For Register Page
const dashboardView = (req, res) => {

    res.render("dashboard", {
        user: req.user,
        home: req.home
    });
    
  };


  module.exports = {
    dashboardView
  };
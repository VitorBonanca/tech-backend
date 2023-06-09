const landingPage = (req, res) => {

    res.render("landing", {
      layout: "landing"
    } );
}

module.exports =  {
    landingPage,
};
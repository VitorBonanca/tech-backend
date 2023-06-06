const Appliance = require("../models/appliance");
const Room = require("../models/room");
const Home = require("../models/home");
const AppliancesEnum = require("../enums/appliances")
const mongoose = require("mongoose");

const addAppliance = async (req, res) => {
  const { type, power, usageDuration, usageFrequency } = req.body;
  const roomId = req.params.roomId;

  if (!type || !power || !usageDuration || !usageFrequency) {
    console.log("Fill empty fields");
  } else {
    try {

      if (!AppliancesEnum.hasOwnProperty(type)) {
        console.log(`"${type}" value does not exist in the enum`);
        return;
      }

      const appliance = new Appliance({
        type: AppliancesEnum[type].Name,
        image: AppliancesEnum[type].Image,
        power,
        usageDuration,
        usageFrequency,
        room: roomId
      });
      
      const savedAppliance = await appliance.save();

      const room = await Room.updateOne({
        _id: roomId
      }, {
        $push: { appliances:savedAppliance._id }
      })
    
      res.redirect(`/room/update/${roomId}`);
      // res.render('../views/room.ejs', { appliancesEnum: Object.values(AppliancesEnum) });

    } catch (error) {
      console.log(error);
      res.status(500).send("Ocorreu um erro ao adicionar o aparelho.");
    }
  }
};

// const showAppliances = async (req, res) => {
//   try {
//     const appliances = await Appliance.find({ room: req.user._id });

//     res.render(`room/update/${roomId}`, { appliances });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Ocorreu um erro ao exibir os aparelhos.");
//   }
// };

module.exports = {
  addAppliance,
  // showAppliance,
};
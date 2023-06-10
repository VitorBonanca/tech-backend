const Appliance = require("../models/appliance");
const Room = require("../models/room");
const Home = require("../models/home");
const AppliancesEnum = require("../enums/appliances")
const mongoose = require("mongoose");

const addAppliance = async (req, res) => {
  const { type, description, power, usageDuration, usageFrequency } = req.body;
  const roomId = req.params.roomId;

  if (!type || !description || !power || !usageDuration || !usageFrequency) {
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
        description,
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
    
      res.redirect(`/room/view/${roomId}`);

    } catch (error) {
      console.log(error);
      res.status(500).send("Ocorreu um erro ao adicionar o aparelho.");
    }
  }
};

const removeAppliance = async (req, res) => {
  const roomId = req.params.roomId;
  const applianceId = req.params.applianceId;
 
  try {
    await Room.updateOne(
      { _id: roomId },
      { $pull: { appliances: applianceId } }
    );

    await Appliance.findByIdAndDelete(applianceId);

    res.redirect(`/room/view/${roomId}`);

  } catch (error) {
    console.log(error);
    res.status(500).send("Ocorreu um erro ao excluir o aparelho.");
  }

}

module.exports = {
  addAppliance,
  removeAppliance,
};
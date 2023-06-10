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

const updateAppliance = async (req, res) => {
  
  const roomId = req.params.roomId;
  const applianceId = req.params.applianceId;
  try {

    const appliance = await Appliance.findById(applianceId);

    if (!appliance) {
      return res.status(404).json({ error: 'Aparelho não encontrado.' });
    }

    appliance.description = req.body.description;
    appliance.power = req.body.power;
    appliance.usageDuration = req.body.usageDuration;
    appliance.usageFrequency = req.body.usageFrequency;

    await appliance.save();

    res.redirect(`/room/view/${roomId}`);

  } catch (error) {
    console.error('Erro ao atualizar o aparelho:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
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
  updateAppliance,
  removeAppliance,
};
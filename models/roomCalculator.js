const ApplianceCalculator = require("./applianceCalculator");

class RoomCalculator {

    static calculateConsumption(room) {
      let consumption = 0;

      for (const appliance of room.appliances) {
        // const applianceCalculator = new ApplianceCalculator(appliance);
        const applianceConsumption = ApplianceCalculator.calculateConsumption(appliance);
        consumption += applianceConsumption;
      }
  
      return consumption;

    };

    static calculateMonthlyCost(room, rate) {
        const consumption = RoomCalculator.calculateConsumption(room);
        const monthlyCost = consumption * rate;
  
        return monthlyCost.toFixed(2);
      };

  }

  module.exports = RoomCalculator;
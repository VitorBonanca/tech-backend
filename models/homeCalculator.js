const RoomCalculator = require("./roomCalculator");

class HomeCalculator {

    static calculateConsumption(home) {
      let consumption = 0;

      for (const room of home.rooms) {
        const roomConsumption = RoomCalculator.calculateConsumption(room);
        consumption += roomConsumption;
      }
  
      return consumption;

    };

    static calculateMonthlyCost(home, rate) {
        const consumption = HomeCalculator.calculateConsumption(home);
        const monthlyCost = consumption * rate;
  
        return monthlyCost.toFixed(2);
      };

  }

  module.exports = HomeCalculator;
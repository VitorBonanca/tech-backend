class ApplianceCalculator {

    static calculateConsumption(appliance) {
      const { power, usageDuration, usageFrequency } = appliance;
      const consumption = (power * usageDuration * usageFrequency)/1000;

      return consumption;
    };

    static calculateMonthlyCost(appliance, rate) {
        const consumption = ApplianceCalculator.calculateConsumption(appliance);
        const monthlyCost = consumption * rate;
  
        return monthlyCost.toFixed(2);
      };

  }

  module.exports = ApplianceCalculator;
const harvestService = require("../services/harvestService");

const harvestData = async (req, res) => {
  try {
    await harvestService.harvestData();
    res.json({ message: "Data harvesting completed successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  harvestData,
};
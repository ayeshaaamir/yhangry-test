const setMenuService = require("../services/setMenuService");

const getSetMenus = async (req, res) => {
  const { cuisineSlug, page = 1, limit = 10 } = req.query;
  try {
    const result = await setMenuService.getSetMenus(cuisineSlug, page, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSetMenus,
};
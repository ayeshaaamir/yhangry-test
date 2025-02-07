const express = require("express");
const setMenuController = require("../controllers/setMenuController");
const harvestController = require("../controllers/harvestController");

const router = express.Router();

router.get("/set-menus", setMenuController.getSetMenus);
router.get("/set-menus/harvest", harvestController.harvestData);

module.exports = router;
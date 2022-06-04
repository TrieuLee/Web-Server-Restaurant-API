const router = require("express").Router();

const FindByOption = require("../controller/findByOptionController");
router.get("./restaurant", FindByOption.findRestaurant);
router.get("./food", FindByOption.findFood);

module.exports = router;

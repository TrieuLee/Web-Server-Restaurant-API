const router = require("express").Router();

const FindByOption = require("../controller/findByOptionController");
router.post("./restaurant", FindByOption.findRestaurant);
router.post("./food", FindByOption.findFood);

module.exports = router;

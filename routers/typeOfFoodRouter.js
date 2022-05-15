const router = require("express").Router();

const TypeofFoodController = require("../controller/typeOfFoodController");

router.get("/:id", TypeofFoodController.getTypeofFood);

router.post("/:id", TypeofFoodController.createTypeFood);

router.put("/:id", TypeofFoodController.updateTypeFood);

router.delete("/:id", TypeofFoodController.deleteTypeFood);

module.exports = router;

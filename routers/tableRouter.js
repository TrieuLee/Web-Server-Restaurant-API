const router = require("express").Router();

const TypeofFoodController = require("../controller/tableController");

router.get("/:id", TypeofFoodController.getTable);

router.post("/:id", TypeofFoodController.createTable);

router.put("/:id", TypeofFoodController.updateTable);

router.delete("/:id", TypeofFoodController.deleteTable);

module.exports = router;

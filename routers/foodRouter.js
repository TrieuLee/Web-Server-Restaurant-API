const router = require("express").Router();

const FoodController = require("../controller/foodController");

router.get("/:id", FoodController.getFood);
router.post("/:id", FoodController.createFood);

router.put("/:id", FoodController.putFood);

router.delete("/:id", FoodController.deleteFood);

module.exports = router;

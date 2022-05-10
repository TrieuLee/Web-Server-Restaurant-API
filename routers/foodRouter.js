const router = require("express").Router();

const FoodController = require("../controller/foodController");

router.get("/", FoodController.getFood);
router.post("/", FoodController.createFood);

router.put("/:id", FoodController.putFood);

router.delete("/:id", FoodController.deleteFood);

module.exports = router;

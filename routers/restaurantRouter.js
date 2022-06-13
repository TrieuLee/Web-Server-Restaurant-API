const router = require("express").Router();
const auth = require("../middleware/auth");

const RestaurantController = require("../controller/restaurantController");

router.get("/", RestaurantController.getRestaurantList);

router.get("/byFounder/:idparner", RestaurantController.getRestaurantByFounder);

router.post("/:id", RestaurantController.createRestaurants);

router.put("/:id/:idparner", RestaurantController.updateRestaurant);

router.delete("/:id", RestaurantController.deleteRestaurant);

module.exports = router;

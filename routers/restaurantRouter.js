const router = require("express").Router();
const auth = require("../middleware/auth");

const RestaurantController = require("../controller/restaurantController");

router.get("/", auth, RestaurantController.getRestaurantList);

router.get("/byFounder", auth, RestaurantController.getRestaurantByFounder);

router.post("/", auth, RestaurantController.createRestaurants);

router.put("/:id", auth, RestaurantController.updateRestaurant);

router.delete("/:id", auth, RestaurantController.deleteRestaurant);

module.exports = router;

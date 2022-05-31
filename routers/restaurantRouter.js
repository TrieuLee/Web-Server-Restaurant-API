const router = require("express").Router();
const auth = require("../middleware/auth");

const RestaurantController = require("../controller/restaurantController");

router.get("/:token", auth, RestaurantController.getRestaurantList);

router.get(
  "/byFounder/:token",
  auth,
  RestaurantController.getRestaurantByFounder
);

router.post("/:token", auth, RestaurantController.createRestaurants);

router.put("/:id/:token", auth, RestaurantController.updateRestaurant);

router.delete("/:id/:token", auth, RestaurantController.deleteRestaurant);

module.exports = router;

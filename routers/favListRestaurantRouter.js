const router = require("express").Router();

const FavListRestaurantController = require("../controller/favListRestaurantController");

router.get("/", FavListRestaurantController.getFavList);

router.get("/all", FavListRestaurantController.getAllList);

router.post("/", FavListRestaurantController.postNewList);

router.delete("/", FavListRestaurantController.deleteList);

module.exports = router;

const router = require("express").Router();
const FavListFoodController = require("../controller/favListFoodController");

router.get("/", FavListFoodController.getFavListFood);

router.get("/all", FavListFoodController.getAllFavFood);

router.post("/", FavListFoodController.createFavListFood);

router.delete("/", FavListFoodController.deleteFavListFood);

module.exports = router;

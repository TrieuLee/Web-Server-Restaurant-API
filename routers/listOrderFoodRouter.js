const router = require("express").Router();

const ListOrderFoodController = require("../controller/listOrderFoodController");

router.get("/customer/:id", ListOrderFoodController.getListOrderFood);
router.post("/", ListOrderFoodController.createListOrderFood);
router.put("/:id", ListOrderFoodController.updateListOrderFood);
router.delete("/:id", ListOrderFoodController.deleteListOrderFood);

module.exports = router;

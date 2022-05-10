const router = require("express").Router();

const customerController = require("../controller/customerController");

router.get("/", customerController.getCustomer);

router.post("/", customerController.createCustomer);

router.put("/:id", customerController.updateCustomer);

router.delete("/:id", customerController.deleteCustomer); 
module.exports = router;

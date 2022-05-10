const router = require("express").Router();

const PaymentController = require("../controller/paymentController");

router.get("/", PaymentController.getPayment);
router.post("/", PaymentController.createPayment);
router.put("/:id", PaymentController.updatePayment);
router.delete("/:id", PaymentController.deletePayment);

module.exports = router;

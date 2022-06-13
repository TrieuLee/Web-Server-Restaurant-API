const router = require("express").Router();
const auth = require("../middleware/auth");

const FounderController = require("../controller/founderController");

router.get("/", FounderController.getFounder);

router.get("/byID/:id", FounderController.getFounderByID);

router.post("/", FounderController.createFounder);

router.put("/:id", FounderController.updateFounder);

router.delete("/:id", FounderController.deleteFounder);

router.post("/login", FounderController.login);

router.get("/loggedIn/:id", FounderController.loggedIn);

router.post("/changPassword/:id", FounderController.changPassword);

router.post("/resetPassword/:id", FounderController.resetPassword);

router.post("/logout", FounderController.logout);

module.exports = router;

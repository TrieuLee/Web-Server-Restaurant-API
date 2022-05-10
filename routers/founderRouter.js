const router = require("express").Router();
const auth = require("../middleware/auth");

const FounderController = require("../controller/founderController");

router.get("/", FounderController.getFounder);

router.get("/byID", auth, FounderController.getFounderByID);

router.post("/", FounderController.createFounder);

router.put("/", auth, FounderController.updateFounder);

router.delete("/", auth, FounderController.deleteFounder);

router.post("/login", FounderController.login);

router.get("/loggedIn", auth, FounderController.loggedIn);

router.post("/changPassword", auth, FounderController.changPassword);

router.post("/resetPassword", auth, FounderController.resetPassword);

router.post("/logout", FounderController.logout);

module.exports = router;

const router = require("express").Router();
const auth = require("../middleware/auth");

const FounderController = require("../controller/founderController");

router.get("/", FounderController.getFounder);

router.get("/byID/:token", auth, FounderController.getFounderByID);

router.post("/", FounderController.createFounder);

router.put("/:token", auth, FounderController.updateFounder);

router.delete("/:token", auth, FounderController.deleteFounder);

router.post("/login", FounderController.login);

router.get("/loggedIn/:token", auth, FounderController.loggedIn);

router.post("/changPassword/:token", auth, FounderController.changPassword);

router.post("/resetPassword/:token", auth, FounderController.resetPassword);

router.post("/logout", FounderController.logout);

module.exports = router;

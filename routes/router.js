const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const assetController = require("../controller/assets.controller");

//API to the users
router.get("/", assetController.getUsers);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);


//API to the assets
router.get("/assets", assetController.find);
router.post("/assets", assetController.create);
router.post("/updateAssets", assetController.update);
router.get("/usersHistory/:assetId", assetController.usersHistory);


module.exports = router;

const express = require("express");
const router = express.Router();
const services = require("../services/render");
const userController = require('../controller/user.controller');
const assetController = require('../controller/assets.controller')




//@description Root Route
//@method GET /

router.get('/', services.homeRoutes)

// //@description for unassigned
// //@method GET /unAssigned

// router.get("/assets", services.create_asset);

// //@description for userDetails
// //@method GET /userDetails

// router.get("/userDetails", services.user_details);



//API to the users
router.post('/api/users', userController.create)
router.get('/api/users', userController.find)
router.put('/api/users/:id', userController.update)
router.delete('/api/users/:id', userController.delete)

//API to the assets
router.post('/api/assets', assetController.create)
router.get('/api/assets', assetController.find)
router.post('/api/updateAssets', assetController.update)
router.delete('/api/assets/:id', assetController.delete)




module.exports = router;



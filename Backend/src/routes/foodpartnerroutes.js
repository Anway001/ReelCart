const express = require('express');
const foodpartnerController = require('../controllers/foodpartnerController');
const authmiddleware = require('../middleware/auth.middleware');
const router = express.Router();



router.get("/profile", authmiddleware.authfoodpatnermiddleware, foodpartnerController.getFoodPartnerById);
router.get("/:id", authmiddleware.usermiddleware, foodpartnerController.getFoodPartnerById);



module.exports = router;
const express = require('express');
const authController = require('../controllers/authcontroller');


const router = express.Router();


// user auth apis
router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.LoginUser);
router.post('/user/logout', authController.logoutUser);

// food partner auth apis
router.post('/foodpartner/register', authController.registerFoodPartner);
router.post('/foodpartner/login', authController.loginFoodPartner);
router.post('/foodpartner/logout', authController.logoutFoodPartner);

module.exports = router;


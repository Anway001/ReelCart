const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodcontroller');
const authmiddleware = require('../middleware/auth.middleware');
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
})


// protect food partner middleware
router.post('/', authmiddleware.authfoodpatnermiddleware, upload.single('video'), foodController.createFood);

router.get('/',authmiddleware.usermiddleware, foodController.getAllFoodItems);






module.exports = router;
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
router.put('/:id', authmiddleware.authfoodpatnermiddleware, upload.single('video'), foodController.updateFood);

router.get('/', authmiddleware.optionalAuthMiddleware, foodController.getAllFoodItems);
router.get('/:id', authmiddleware.optionalAuthMiddleware, foodController.getFoodItem);
router.get('/saves', authmiddleware.anyAuthMiddleware, foodController.getSavedFoodItems);
router.get('/:foodId/comments', authmiddleware.optionalAuthMiddleware, foodController.getFoodComments);
router.get('/:foodId/related', authmiddleware.optionalAuthMiddleware, foodController.getRelatedFoods);

router.post('/likes', authmiddleware.anyAuthMiddleware, foodController.likedFoodItems);
router.post('/:foodId/comments', authmiddleware.anyAuthMiddleware, foodController.addFoodComment);
router.post('/saves', authmiddleware.anyAuthMiddleware, foodController.savedFoodItems);

module.exports = router;
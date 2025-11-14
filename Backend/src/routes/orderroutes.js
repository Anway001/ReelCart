const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordercontroller');
const authmiddleware = require('../middleware/auth.middleware');

// User routes
router.post('/', authmiddleware.usermiddleware, orderController.createOrder);
router.get('/', authmiddleware.usermiddleware, orderController.getUserOrders);
router.get('/:orderId', authmiddleware.usermiddleware, orderController.getOrderDetails);

// Partner routes
router.get('/partner/orders', authmiddleware.authfoodpatnermiddleware, orderController.getPartnerOrders);
router.patch('/:orderId/status', authmiddleware.authfoodpatnermiddleware, orderController.updateOrderStatus);

module.exports = router;
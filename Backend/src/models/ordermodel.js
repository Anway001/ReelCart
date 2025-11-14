const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [{
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'food',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        price: {
            type: Number,
            required: true,
        },
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'preparing', 'on_the_way', 'delivered', 'cancelled'],
        default: 'pending',
    },
    paymentMethod: {
        type: String,
        default: 'COD',
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;
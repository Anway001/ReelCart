const mongoose = require('mongoose');

const foodmodelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    discription: {
        type: String,
    },
    category: {
        type: String,
        default: 'General',
    },
    tags: [{
        type: String,
    }],
    price: {
        type: Number,
        required: true,
    },
    foodpartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodpartner',
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    saveCount:{
        type: Number,
        default: 0,
    },
    availableQuantity: {
        type: Number,
        default: 0,
    }
});

const foodmodel = mongoose.model('food', foodmodelSchema);
module.exports = foodmodel;
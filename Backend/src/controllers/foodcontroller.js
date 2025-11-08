const foodmodel = require('../models/foodmodel');
const storageServices = require('../services/storageservices');

async function createFood(req, res) {
    try {
        const { v4: uuid } = await import('uuid');
        let fileUploadResult = null;
        if (req.file) {
            const fileName = `${uuid()}_${req.file.originalname}`;
            fileUploadResult = await storageServices.uploadFile(req.file, fileName);
            console.log('File upload result:', fileUploadResult);
        }
        const foodItem = await foodmodel.create({
            name : req.body.name,
            discription : req.body.discription,
            video:fileUploadResult.url,
            foodpartner : req.foodpartner._id
        })
        res.status(201).json({
            message: 'Food created successfully',
            food: foodItem
        })



        
    } catch (error) {
        console.error('Error creating food:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message || 'Internal server error'
        });

    }
}


async function getAllFoodItems (req, res) {
    try {
        const foodItems = await foodmodel.find({})
        res.status(200).json({
            message: 'Food items retrieved successfully',
            foodItems: foodItems
        }); 
    }
    catch (error) {
        console.error('Error getting food items:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message || 'Internal server error'
        });
    }
}

module.exports = { 
    createFood,
    getAllFoodItems
}; 
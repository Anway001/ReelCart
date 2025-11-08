const FoodPartnerModel = require('../models/foodpatnermodules');
const FoodModel = require('../models/foodmodel');

async function getFoodPartnerById(req, res) {
    try {
        const partnerId = req.params?.id || req.foodpartner?._id;
        if (!partnerId) {
            return res.status(400).json({ message: "Food Partner ID is required" });
        }

        const foodPartner = await FoodPartnerModel.findById(partnerId);
        if (!foodPartner) {
            return res.status(404).json({ message: "Food Partner not found" });
        }

        const foodItembyFoodPartner = await FoodModel.find({ foodpartner: partnerId });
        const partnerData = foodPartner.toObject();
        delete partnerData.password;

        res.status(200).json({
            message: "Food Partner details fetched successfully",
            partner: {
                ...partnerData,
                foodItems: foodItembyFoodPartner
            }
        });
    } catch (error) {
        console.error('Error fetching food partner:', error);
        res.status(500).json({ message: "Error fetching food partner details" });
    }
};

module.exports = {
    getFoodPartnerById
}
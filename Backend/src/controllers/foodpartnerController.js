const FoodPartnerModel = require('../models/foodpatnermodules');
const FoodModel = require('../models/foodmodel');
const FollowModel = require('../models/Follow.model');
const OrderModel = require('../models/ordermodel');

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

        const totalMeals = foodItembyFoodPartner.length;

        const partnerFoodIds = foodItembyFoodPartner.map(food => food._id);

        const uniqueCustomersData = await OrderModel.aggregate([
            {
                $match: {
                    'items.food': { $in: partnerFoodIds }
                }
            },
            {
                $group: {
                    _id: '$user'
                }
            },
            {
                $count: 'totalCustomers'
            }
        ]);

        const customersServed = uniqueCustomersData.length > 0 ? uniqueCustomersData[0].totalCustomers : 0;

        let isFollowing = false;
        const userId = req.user?._id;
        if (userId) {
            const followRecord = await FollowModel.exists({ user: userId, partner: partnerId });
            isFollowing = !!followRecord;
        }

        res.status(200).json({
            message: "Food Partner details fetched successfully",
            partner: {
                ...partnerData,
                foodItems: foodItembyFoodPartner,
                totalMeals,
                customersServed
            },
            isFollowing
        });
    } catch (error) {
        console.error('Error fetching food partner:', error);
        res.status(500).json({ message: "Error fetching food partner details" });
    }
};

module.exports = {
    getFoodPartnerById
}
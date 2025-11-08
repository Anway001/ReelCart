const foodpartnerModel = require('../models/foodpatnermodules');
const userModel = require('../models/usermodel');
const jwt = require('jsonwebtoken');

async function authfoodpatnermiddleware(req, res, next) {
    const token = req.cookies.token;
    console.log('Token:', token); // Debug log
    
    if (!token) {
        return res.status(401).json({message: "Please login first"});
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded); // Debug log
        
        const foodpartner = await foodpartnerModel.findById(decoded.id);
        console.log('Found food partner:', foodpartner); // Debug log
        
        if (!foodpartner) {
            return res.status(404).json({message: "Food partner not found"});
        }
        
        req.foodpartner = foodpartner;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error); // Debug log
        res.status(500).json({message: "Authentication failed", error: error.message});
    }
}

async function usermiddleware(req, res, next) {
    const token = req.cookies.token ;
    if(!token){
        return res.status(401).json({message:"please login first"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        req.user = user;
        next();
    }
    catch(error){
        res.status(500).json({message:"Authentication failed", error:error.message});
    }
}


module.exports = {
    authfoodpatnermiddleware,
    usermiddleware

};
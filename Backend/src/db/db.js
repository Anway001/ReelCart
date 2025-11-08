const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL 
function connectDB() {
    mongoose.connect(MONGODB_URL)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB", err);
        }); 
}

module.exports = connectDB;

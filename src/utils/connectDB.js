const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        .then(()=>{
            console.log("Connected TO MongoDB");
        })
    
    } catch (error) {
        console.log("Error connecting to MongoDB", error);    
    }
}

module.exports = connectDB
const mongoose = require('mongoose');

const connectDB = async(req,res) =>
{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("db is connected");
    }
    catch(err){
       console.log("There is some error in connecting db",err);
       process.exit(1); 
    }
};

module.exports = connectDB;
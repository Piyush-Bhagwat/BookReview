require("dotenv").config();
const { default: mongoose } = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');


    } catch (e) {
        console.log("Cant connect to DB", e);;

    }

}

module.exports = connectDB;
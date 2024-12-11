const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    videoURL: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        require: true,
        trim: true,
    }
 
}, { timestamps: true });



module.exports = mongoose.model("User", userSchema);

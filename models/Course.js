const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the User schema
const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    language: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    difficulty: { type: String, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
});



module.exports = mongoose.model("Course", courseSchema);

const mongoose = require("mongoose")

async function connect() {
    try {
        await mongoose.connect(
            "mongodb+srv://karlk:QxWJNq7Xg0Obqg0u@cluster0.sfmjq.mongodb.net/", 
            { useNewUrlParser: true }  
        )
    }  catch (err) {
        console.error("Error connecting to mongodb")
        console.error(err)
    }  
}

module.exports = { connect }
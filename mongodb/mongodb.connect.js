const mongoose = require("mongoose")

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(
            "<INSERT-MONGODB-URI-HERE", 
            { useNewUrlParser: true }  
        )
    }  catch (err) {
        console.error("Error connecting to mongodb")
        console.error(err)
    }  
}

module.exports = connectToMongoDB
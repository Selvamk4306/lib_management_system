const mongoose = require("mongoose");

function DBConnection(){
    const URL = process.env.MONGO_URL;

    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "connection error:"))
    db.once("open", function(){
        console.log("Database connected successfully")
    })
}

module.exports = DBConnection;
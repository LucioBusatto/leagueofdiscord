const mongoose = require ("mongoose");

const dataSchema = mongoose.Schema({
    name: String,
    userID: String,
    elo: Number,
    wins: Number,
    draws: Number,
    loses: Number,
})


module.exports = mongoose.model("Profile", dataSchema);
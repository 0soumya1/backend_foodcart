const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    img:String
});

module.exports = mongoose.model("items", itemSchema);
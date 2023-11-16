const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: String,
  userName: String,
  orderDate: Date,
  total: Number,
  orderId: String,
  itemList: Array,
});

module.exports = mongoose.model("orders", orderSchema);

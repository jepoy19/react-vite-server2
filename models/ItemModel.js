const mongoose = require("mongoose");


const itemSchema = new mongoose.Schema({
  item: String,
  stocks: Number,
  price: Number,
});
const itemModel = mongoose.model("items", itemSchema);
module.exports = itemModel;

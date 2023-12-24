var mongoose = require("mongoose");

var productsSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "globals"
  },
  price: {
    type: Number
  },
  saledPrice: {
    type: Number,
    default: null
  },
  date: {
    type: Date,
    default: Date.now
  },
  saledDate: {
    type: Date,
    default: null
  },
  company: {
    type: String
  },
  saledCompany: {
    type: String,
    default: null
  }
});
productsSchema.set('timestamps', true);
var Products = mongoose.model("products", productsSchema);

module.exports = Products;

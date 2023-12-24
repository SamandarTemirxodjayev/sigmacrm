var mongoose = require("mongoose");

var partiyaSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "globals"
  },
  status: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number
  },
  companyName: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
});
partiyaSchema.set('timestamps', true);
var Partiya = mongoose.model("partiya", partiyaSchema);

module.exports = Partiya;

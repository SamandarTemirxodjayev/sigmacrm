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
    day: {
      type: Number,
      default: null
    },
    month: {
      type: Number,
      default: null
    },
    year: {
      type: Number,
      default: null
    }
  },
  time: {
    hour: {
      type: Number,
      default: null
    },
    minute: {
      type: Number,
      default: null
    },
    second: {
      type: Number,
      default: null
    }
  },
});
var Partiya = mongoose.model("partiya", partiyaSchema);

module.exports = Partiya;

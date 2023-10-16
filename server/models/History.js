var mongoose = require("mongoose");

var historySchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products"
  },
  status: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    default: 0
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
  dateIn: {
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
  }
});
var History = mongoose.model("history", historySchema);

module.exports = History;

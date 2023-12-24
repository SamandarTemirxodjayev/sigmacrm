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
    type: Date,
    default: null
  },
  dateIn: {
    type: Date,
    default: Date.now
  }
});
historySchema.set('timestamps', true);

var History = mongoose.model("history", historySchema);

module.exports = History;

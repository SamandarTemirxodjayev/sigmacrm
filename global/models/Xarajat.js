var mongoose = require("mongoose");

var xarajatSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  amount: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});
xarajatSchema.set('timestamps', true);

var Xarajats = mongoose.model("xarajat", xarajatSchema);

module.exports = Xarajats;

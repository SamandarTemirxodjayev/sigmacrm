var mongoose = require("mongoose");

var globalsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  quantity: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});
globalsSchema.set('timestamps', true);

var Globals = mongoose.model("globals", globalsSchema);

module.exports = Globals;

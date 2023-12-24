const mongoose = require("mongoose");

const DataValueSchema = new mongoose.Schema({
  tgId: {
    type: String,
  },
  value: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
DataValueSchema.set('timestamps', true);

const DataValue = mongoose.model("datavalue", DataValueSchema);

module.exports = DataValue;

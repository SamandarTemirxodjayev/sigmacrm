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
    day: {
      type: Number
    },
    month: {
      type: Number
    },
    year: {
      type: Number
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
  saledDate: {
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
  saledTime: {
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
  company: {
    type: String
  },
  saledCompany: {
    type: String,
    default: null
  }
});
var Products = mongoose.model("products", productsSchema);

module.exports = Products;

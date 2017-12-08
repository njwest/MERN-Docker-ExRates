const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var currencyRateSchema = new Schema({
  rates: Object,
  base: String,
  timestamp: Number
  },
  { timestamps:
    { createdAt: 'created_at' }
  }
);

module.exports = mongoose.model('CurrencyRate', currencyRateSchema);

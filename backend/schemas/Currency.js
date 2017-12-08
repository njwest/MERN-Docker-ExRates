const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var currencySchema = new Schema({
  data: Object
  },
  { timestamps:
    { createdAt: 'created_at' }
  }
);

module.exports = mongoose.model('Currency', currencySchema);

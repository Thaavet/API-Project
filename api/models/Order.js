const mongoose = require('mongoose');
const Product = require('./productSchema');
const User = require('./User');

const OrderSchema = new mongoose.Schema({
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



module.exports = mongoose.model('Order', OrderSchema);
const mongoose = require('mongoose');
const ProductSchema = require('./productSchema');

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }, 
  category: {
    type: String,
    required: true,
    enum: ['Handicrafts', 'Food', 'Textiles', 'Art']
  },
  seller: {
    type: String,
    ref: 'User',
    required: true
  },
  image: {
      type: Object,
      default:{}
  },
});

module.exports = mongoose.model('Product', productSchema);
const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coinId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity must be positive']
  },
  buyPrice: {
    type: Number,
    required: true,
    min: [0, 'Buy price must be positive']
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create compound index for user and coin
portfolioSchema.index({ userId: 1, coinId: 1 });

module.exports = mongoose.model('Portfolio', portfolioSchema);
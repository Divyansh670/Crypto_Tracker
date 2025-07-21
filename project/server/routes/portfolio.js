const express = require('express');
const { getPortfolio, addToPortfolio, removeFromPortfolio } = require('../controllers/portfolioController');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/portfolio
// @desc    Get user portfolio
// @access  Private
router.get('/', auth, getPortfolio);

// @route   POST /api/portfolio
// @desc    Add to portfolio
// @access  Private
router.post('/', auth, addToPortfolio);

// @route   DELETE /api/portfolio/:coinId
// @desc    Remove from portfolio
// @access  Private
router.delete('/:coinId', auth, removeFromPortfolio);

module.exports = router;
const express = require('express');
const { getWatchlist, addToWatchlist, removeFromWatchlist } = require('../controllers/watchlistController');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/watchlist
// @desc    Get user watchlist
// @access  Private
router.get('/', auth, getWatchlist);

// @route   POST /api/watchlist
// @desc    Add to watchlist
// @access  Private
router.post('/', auth, addToWatchlist);

// @route   DELETE /api/watchlist/:coinId
// @desc    Remove from watchlist
// @access  Private
router.delete('/:coinId', auth, removeFromWatchlist);

module.exports = router;
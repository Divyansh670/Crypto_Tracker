const Watchlist = require('../models/Watchlist');

// Get user watchlist
const getWatchlist = async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ userId: req.userId });
    
    res.json({
      success: true,
      watchlist
    });

  } catch (error) {
    console.error('Get watchlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching watchlist',
      error: error.message
    });
  }
};

// Add to watchlist
const addToWatchlist = async (req, res) => {
  try {
    const { coinId, name, symbol, image } = req.body;

    // Check if already in watchlist
    const existingItem = await Watchlist.findOne({ 
      userId: req.userId, 
      coinId 
    });

    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: 'Coin already in watchlist'
      });
    }

    const watchlistItem = new Watchlist({
      userId: req.userId,
      coinId,
      name,
      symbol,
      image
    });

    await watchlistItem.save();

    res.status(201).json({
      success: true,
      message: 'Added to watchlist successfully',
      item: watchlistItem
    });

  } catch (error) {
    console.error('Add to watchlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error adding to watchlist',
      error: error.message
    });
  }
};

// Remove from watchlist
const removeFromWatchlist = async (req, res) => {
  try {
    const { coinId } = req.params;

    const result = await Watchlist.findOneAndDelete({ 
      userId: req.userId, 
      coinId 
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in watchlist'
      });
    }

    res.json({
      success: true,
      message: 'Removed from watchlist successfully'
    });

  } catch (error) {
    console.error('Remove from watchlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error removing from watchlist',
      error: error.message
    });
  }
};

module.exports = {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist
};
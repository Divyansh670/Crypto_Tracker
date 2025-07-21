const Portfolio = require('../models/Portfolio');

// Get user portfolio
const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ userId: req.userId });
    
    res.json({
      success: true,
      portfolio
    });

  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching portfolio',
      error: error.message
    });
  }
};

// Add to portfolio
const addToPortfolio = async (req, res) => {
  try {
    const { coinId, name, symbol, quantity, buyPrice, image } = req.body;

    // Check if coin already exists in portfolio
    const existingHolding = await Portfolio.findOne({ 
      userId: req.userId, 
      coinId 
    });

    if (existingHolding) {
      // Update existing holding - calculate average buy price
      const totalQuantity = existingHolding.quantity + quantity;
      const totalValue = (existingHolding.quantity * existingHolding.buyPrice) + (quantity * buyPrice);
      const averageBuyPrice = totalValue / totalQuantity;

      existingHolding.quantity = totalQuantity;
      existingHolding.buyPrice = averageBuyPrice;
      
      await existingHolding.save();

      res.json({
        success: true,
        message: 'Portfolio updated successfully',
        holding: existingHolding
      });

    } else {
      // Create new holding
      const newHolding = new Portfolio({
        userId: req.userId,
        coinId,
        name,
        symbol,
        quantity,
        buyPrice,
        image
      });

      await newHolding.save();

      res.status(201).json({
        success: true,
        message: 'Added to portfolio successfully',
        holding: newHolding
      });
    }

  } catch (error) {
    console.error('Add to portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error adding to portfolio',
      error: error.message
    });
  }
};

// Remove from portfolio
const removeFromPortfolio = async (req, res) => {
  try {
    const { coinId } = req.params;

    const result = await Portfolio.findOneAndDelete({ 
      userId: req.userId, 
      coinId 
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Holding not found in portfolio'
      });
    }

    res.json({
      success: true,
      message: 'Removed from portfolio successfully'
    });

  } catch (error) {
    console.error('Remove from portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error removing from portfolio',
      error: error.message
    });
  }
};

module.exports = {
  getPortfolio,
  addToPortfolio,
  removeFromPortfolio
};
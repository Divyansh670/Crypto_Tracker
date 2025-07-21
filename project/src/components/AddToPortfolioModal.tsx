import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { toast } from 'react-toastify';

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
}

interface AddToPortfolioModalProps {
  crypto: Crypto;
  onClose: () => void;
}

function AddToPortfolioModal({ crypto, onClose }: AddToPortfolioModalProps) {
  const [quantity, setQuantity] = useState('');
  const [buyPrice, setBuyPrice] = useState(crypto.current_price.toString());
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const portfolioItem = {
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        quantity: parseFloat(quantity),
        buyPrice: parseFloat(buyPrice),
        currentPrice: crypto.current_price,
        image: crypto.image,
        addedAt: new Date().toISOString()
      };

      // Get existing portfolio
      const existingPortfolio = JSON.parse(localStorage.getItem('portfolio') || '[]');
      
      // Check if crypto already exists in portfolio
      const existingIndex = existingPortfolio.findIndex((item: any) => item.id === crypto.id);
      
      if (existingIndex >= 0) {
        // Update existing holding
        existingPortfolio[existingIndex].quantity += portfolioItem.quantity;
        existingPortfolio[existingIndex].buyPrice = 
          ((existingPortfolio[existingIndex].quantity - portfolioItem.quantity) * existingPortfolio[existingIndex].buyPrice + 
           portfolioItem.quantity * portfolioItem.buyPrice) / existingPortfolio[existingIndex].quantity;
      } else {
        // Add new holding
        existingPortfolio.push(portfolioItem);
      }

      localStorage.setItem('portfolio', JSON.stringify(existingPortfolio));
      toast.success(`${crypto.name} added to portfolio!`);
      onClose();
    } catch (error) {
      toast.error('Failed to add to portfolio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Add to Portfolio</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex items-center space-x-3 mb-6 p-4 bg-slate-700/50 rounded-lg">
          <img src={crypto.image} alt={crypto.name} className="h-10 w-10 rounded-full" />
          <div>
            <div className="text-white font-medium">{crypto.name}</div>
            <div className="text-slate-400 text-sm">{crypto.symbol.toUpperCase()}</div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-white font-medium">${crypto.current_price.toFixed(2)}</div>
            <div className="text-slate-400 text-sm">Current Price</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Quantity
            </label>
            <input
              type="number"
              step="any"
              min="0"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="Enter quantity"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Buy Price (USD)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              required
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              className="w-full px-3 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="Enter buy price"
            />
          </div>

          {quantity && buyPrice && (
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Total Investment:</span>
                <span className="text-white font-medium">
                  ${(parseFloat(quantity) * parseFloat(buyPrice)).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !quantity || !buyPrice}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>Add to Portfolio</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddToPortfolioModal;
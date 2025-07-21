import React, { useState, useEffect } from 'react';
import { Star, Plus, Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { getCryptoData } from '../services/api';
import AddToPortfolioModal from '../components/AddToPortfolioModal';

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  market_cap_rank: number;
}

function Dashboard() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [filteredCryptos, setFilteredCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCryptoData();
        setCryptos(data);
        setFilteredCryptos(data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
        toast.error('Failed to fetch cryptocurrency data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);

    // Load watchlist from localStorage
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filtered = cryptos.filter(crypto =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCryptos(filtered);
  }, [searchTerm, cryptos]);

  const toggleWatchlist = (cryptoId: string) => {
    const newWatchlist = watchlist.includes(cryptoId)
      ? watchlist.filter(id => id !== cryptoId)
      : [...watchlist, cryptoId];
    
    setWatchlist(newWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
    
    const action = watchlist.includes(cryptoId) ? 'removed from' : 'added to';
    toast.success(`Cryptocurrency ${action} watchlist`);
  };

  const handleAddToPortfolio = (crypto: Crypto) => {
    setSelectedCrypto(crypto);
    setShowAddModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading cryptocurrency data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-300">Monitor live cryptocurrency prices and manage your investments</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Crypto Table */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Coin
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                    24h Change
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredCryptos.map((crypto) => (
                  <tr key={crypto.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {crypto.market_cap_rank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <img
                          src={crypto.image}
                          alt={crypto.name}
                          className="h-8 w-8 rounded-full"
                        />
                        <div>
                          <div className="text-sm font-medium text-white">{crypto.name}</div>
                          <div className="text-sm text-slate-400">{crypto.symbol.toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-white">
                      ${crypto.current_price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className={`flex items-center justify-end space-x-1 ${
                        crypto.price_change_percentage_24h >= 0 
                          ? 'text-emerald-400' 
                          : 'text-red-400'
                      }`}>
                        {crypto.price_change_percentage_24h >= 0 ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                        <span>
                          {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => toggleWatchlist(crypto.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            watchlist.includes(crypto.id)
                              ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                              : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-yellow-400'
                          }`}
                          title={watchlist.includes(crypto.id) ? 'Remove from watchlist' : 'Add to watchlist'}
                        >
                          <Star className={`h-4 w-4 ${watchlist.includes(crypto.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={() => handleAddToPortfolio(crypto)}
                          className="p-2 bg-emerald-600/20 text-emerald-400 rounded-lg hover:bg-emerald-600/30 transition-colors"
                          title="Add to portfolio"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredCryptos.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-slate-400">No cryptocurrencies found matching "{searchTerm}"</p>
          </div>
        )}
      </div>

      {showAddModal && selectedCrypto && (
        <AddToPortfolioModal
          crypto={selectedCrypto}
          onClose={() => {
            setShowAddModal(false);
            setSelectedCrypto(null);
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;
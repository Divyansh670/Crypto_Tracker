import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Star, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { getCryptoData } from '../services/api';

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  market_cap_rank: number;
}

function Home() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCryptoData();
        setCryptos(data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Track Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                {' '}Crypto{' '}
              </span>
              Portfolio
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Monitor real-time cryptocurrency prices, manage your portfolio, and track your investments 
              with our comprehensive crypto tracking platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="border border-slate-600 hover:border-slate-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-slate-800/50"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Live Prices Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Live Cryptocurrency Prices</h2>
          <p className="text-slate-300">Real-time data from the top 10 cryptocurrencies</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
          </div>
        ) : (
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {cryptos.map((crypto) => (
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose CryptoTrack?</h2>
          <p className="text-slate-300">Everything you need to manage your crypto investments</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700/50 p-6 text-center hover:bg-slate-800/70 transition-all duration-300">
            <TrendingUp className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Tracking</h3>
            <p className="text-slate-300">
              Monitor live cryptocurrency prices with automatic updates every 30 seconds
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700/50 p-6 text-center hover:bg-slate-800/70 transition-all duration-300">
            <Star className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Portfolio Management</h3>
            <p className="text-slate-300">
              Track your investments, calculate profit/loss, and visualize your portfolio performance
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700/50 p-6 text-center hover:bg-slate-800/70 transition-all duration-300">
            <ArrowUpRight className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Export & Analytics</h3>
            <p className="text-slate-300">
              Export your portfolio data and get detailed analytics on your crypto investments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
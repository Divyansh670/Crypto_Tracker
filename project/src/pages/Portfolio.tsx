import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Download, TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';
import { toast } from 'react-toastify';

interface PortfolioItem {
  id: string;
  name: string;
  symbol: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  image: string;
}

function Portfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load portfolio from localStorage
    const savedPortfolio = localStorage.getItem('portfolio');
    if (savedPortfolio) {
      setPortfolio(JSON.parse(savedPortfolio));
    }
    setLoading(false);
  }, []);

  const totalInvestment = portfolio.reduce((sum, item) => sum + (item.quantity * item.buyPrice), 0);
  const currentValue = portfolio.reduce((sum, item) => sum + (item.quantity * item.currentPrice), 0);
  const totalProfitLoss = currentValue - totalInvestment;
  const totalProfitLossPercentage = totalInvestment > 0 ? (totalProfitLoss / totalInvestment) * 100 : 0;

  const pieData = portfolio.map(item => ({
    name: item.symbol.toUpperCase(),
    value: item.quantity * item.currentPrice,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`
  }));

  const barData = portfolio.map(item => {
    const invested = item.quantity * item.buyPrice;
    const current = item.quantity * item.currentPrice;
    const profitLoss = current - invested;
    
    return {
      name: item.symbol.toUpperCase(),
      invested,
      current,
      profitLoss
    };
  });

  const exportToCSV = () => {
    const headers = ['Coin', 'Symbol', 'Quantity', 'Buy Price', 'Current Price', 'Investment', 'Current Value', 'Profit/Loss', 'P/L %'];
    const csvData = portfolio.map(item => {
      const investment = item.quantity * item.buyPrice;
      const currentVal = item.quantity * item.currentPrice;
      const profitLoss = currentVal - investment;
      const profitLossPercentage = investment > 0 ? (profitLoss / investment) * 100 : 0;
      
      return [
        item.name,
        item.symbol.toUpperCase(),
        item.quantity,
        `$${item.buyPrice.toFixed(2)}`,
        `$${item.currentPrice.toFixed(2)}`,
        `$${investment.toFixed(2)}`,
        `$${currentVal.toFixed(2)}`,
        `$${profitLoss.toFixed(2)}`,
        `${profitLossPercentage.toFixed(2)}%`
      ];
    });

    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cryptotrack-portfolio.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Portfolio exported to CSV!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (portfolio.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <TrendingUp className="mx-auto h-16 w-16 text-slate-400 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Your Portfolio is Empty</h2>
            <p className="text-slate-300 mb-6">Start building your crypto portfolio by adding some coins from the dashboard.</p>
            <a
              href="/dashboard"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
            <p className="text-slate-300">Track your cryptocurrency investments and performance</p>
          </div>
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-slate-400 text-sm">Total Investment</p>
                <p className="text-white text-xl font-bold">${totalInvestment.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-emerald-400" />
              <div>
                <p className="text-slate-400 text-sm">Current Value</p>
                <p className="text-white text-xl font-bold">${currentValue.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center space-x-3">
              {totalProfitLoss >= 0 ? (
                <TrendingUp className="h-8 w-8 text-emerald-400" />
              ) : (
                <TrendingDown className="h-8 w-8 text-red-400" />
              )}
              <div>
                <p className="text-slate-400 text-sm">Profit/Loss</p>
                <p className={`text-xl font-bold ${totalProfitLoss >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  ${totalProfitLoss.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center space-x-3">
              <Percent className="h-8 w-8 text-yellow-400" />
              <div>
                <p className="text-slate-400 text-sm">P/L Percentage</p>
                <p className={`text-xl font-bold ${totalProfitLossPercentage >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {totalProfitLossPercentage.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Portfolio Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'Value']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Investment vs Current Value</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
                />
                <Legend />
                <Bar dataKey="invested" fill="#3B82F6" name="Invested" />
                <Bar dataKey="current" fill="#10B981" name="Current Value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Portfolio Table */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700/50">
            <h3 className="text-xl font-bold text-white">Holdings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Coin
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Buy Price
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Current Price
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Investment
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Current Value
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Profit/Loss
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {portfolio.map((item) => {
                  const investment = item.quantity * item.buyPrice;
                  const currentVal = item.quantity * item.currentPrice;
                  const profitLoss = currentVal - investment;
                  const profitLossPercentage = investment > 0 ? (profitLoss / investment) * 100 : 0;

                  return (
                    <tr key={item.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-8 w-8 rounded-full"
                          />
                          <div>
                            <div className="text-sm font-medium text-white">{item.name}</div>
                            <div className="text-sm text-slate-400">{item.symbol.toUpperCase()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-white">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-white">
                        ${item.buyPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-white">
                        ${item.currentPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-white">
                        ${investment.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-white">
                        ${currentVal.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <div className={`${profitLoss >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          <div>${profitLoss.toFixed(2)}</div>
                          <div className="text-xs">({profitLossPercentage.toFixed(2)}%)</div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
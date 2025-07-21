import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getCryptoData = async () => {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw error;
  }
};

export const getCryptoDetails = async (id: string) => {
  try {
    const response = await axios.get(`${COINGECKO_API}/coins/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto details:', error);
    throw error;
  }
};

// Auth API calls
export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await apiClient.post('/api/auth/register', userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await apiClient.post('/api/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/api/auth/profile');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

// Portfolio API calls
export const getPortfolio = async () => {
  try {
    const response = await apiClient.get('/api/portfolio');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const addToPortfolio = async (portfolioData: {
  coinId: string;
  name: string;
  symbol: string;
  quantity: number;
  buyPrice: number;
  image: string;
}) => {
  try {
    const response = await apiClient.post('/api/portfolio', portfolioData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const removeFromPortfolio = async (coinId: string) => {
  try {
    const response = await apiClient.delete(`/api/portfolio/${coinId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

// Watchlist API calls
export const getWatchlist = async () => {
  try {
    const response = await apiClient.get('/api/watchlist');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const addToWatchlist = async (watchlistData: {
  coinId: string;
  name: string;
  symbol: string;
  image: string;
}) => {
  try {
    const response = await apiClient.post('/api/watchlist', watchlistData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const removeFromWatchlist = async (coinId: string) => {
  try {
    const response = await apiClient.delete(`/api/watchlist/${coinId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};
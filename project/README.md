# 🚀 CryptoTrack - Cryptocurrency Portfolio Manager

A comprehensive real-time cryptocurrency tracking and portfolio management application built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **Real-time Price Tracking**: Monitor live cryptocurrency prices for the top 10 coins
- **Portfolio Management**: Add, track, and manage your crypto investments
- **Profit/Loss Calculation**: Real-time calculation of gains and losses
- **Interactive Charts**: Visualize your portfolio distribution and performance
- **Watchlist**: Save your favorite cryptocurrencies for quick access
- **Search Functionality**: Find cryptocurrencies by name or symbol
- **Export Data**: Download your portfolio data as CSV
- **Responsive Design**: Beautiful dark theme optimized for all devices
- **User Authentication**: Secure login and registration system

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **React Router** for navigation
- **Axios** for API calls
- **React Toastify** for notifications
- **Lucide React** for icons

### Backend (Demo Mode)
- **Node.js** with Express.js
- **MongoDB Atlas** for database
- **JWT** authentication
- **bcryptjs** for password hashing
- **Mongoose** for MongoDB ODM

### APIs
- **CoinGecko API** for real-time cryptocurrency data

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cryptotrack.git
   cd cryptotrack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the backend**
   ```bash
   cd server
   npm install
   ```

4. **Create environment file**
   Create a `.env` file inside the `/server` folder with:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://divyansh:Divyansh%401805@backend.ygz6q.mongodb.net/?retryWrites=true&w=majority
   JWT_SECRET=your_secret_key
   ```

5. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

6. **Start the frontend development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:5173`

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

#### Portfolio
- `GET /api/portfolio` - Get user portfolio (protected)
- `POST /api/portfolio` - Add to portfolio (protected)
- `DELETE /api/portfolio/:coinId` - Remove from portfolio (protected)

#### Watchlist
- `GET /api/watchlist` - Get user watchlist (protected)
- `POST /api/watchlist` - Add to watchlist (protected)
- `DELETE /api/watchlist/:coinId` - Remove from watchlist (protected)

## 📱 Screenshots

### Home Page
Beautiful landing page with live cryptocurrency prices and modern gradient design.

### Dashboard
Real-time price tracking with search functionality and portfolio management tools.

### Portfolio
Comprehensive portfolio overview with interactive charts and detailed analytics.

## 🔧 Configuration

The application uses MongoDB Atlas for data persistence and JWT for authentication.

### Environment Variables (for backend integration)

#### Frontend (.env)
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000
REACT_APP_COINGECKO_API=https://api.coingecko.com/api/v3
```

#### Backend (server/.env)
Create a `.env` file in the server directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://divyansh:Divyansh%401805@backend.ygz6q.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
```

💡 **Note**: 
- Vite environment variables must start with `VITE_`
- The MongoDB URI is configured for MongoDB Atlas
- Make sure to change `JWT_SECRET` to a secure random string in production
- Never commit the `.env` file to version control

## 📊 Features in Detail

### Real-time Price Tracking
- Fetches data from CoinGecko API every 30 seconds
- Displays top 10 cryptocurrencies by market cap
- Shows 24-hour price changes with visual indicators

### Portfolio Management
- Add cryptocurrencies with quantity and buy price (stored in MongoDB)
- Automatic profit/loss calculation with real-time updates
- Portfolio distribution visualization
- Investment vs current value comparison
- Average buy price calculation for multiple purchases

### User Authentication
- Secure JWT-based authentication
- Password hashing with bcryptjs
- Protected routes and API endpoints
- User session management
### Data Export
- Export portfolio data to CSV format
- Includes all relevant metrics and calculations

### User Experience
- Smooth animations and transitions
- Loading states and error handling
- Toast notifications for user feedback
- Fully responsive design

### Database Features
- MongoDB Atlas cloud database
- User-specific portfolio and watchlist data
- Efficient indexing for performance
- Data validation and error handling
## 🚀 Deployment

The application is ready for deployment on various platforms:

### Netlify/Vercel (Frontend)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in the platform dashboard

### Railway/Render (Full-stack)
1. Connect your GitHub repository
2. Set up environment variables (including MongoDB URI and JWT secret)
3. Deploy automatically

### Environment Variables for Production
Make sure to set these environment variables in your deployment platform:

**Frontend:**
- `VITE_API_URL` - Your backend API URL

**Backend:**
- `PORT` - Server port (usually set automatically)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secure random string for JWT signing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Created by Divyansh Srivastav**

- GitHub: [@divyanshsrivastav](https://github.com/divyanshsrivastav)
- LinkedIn: [Divyansh Srivastav](https://linkedin.com/in/divyanshsrivastav)

## 🙏 Acknowledgments

- [CoinGecko](https://coingecko.com) for providing free cryptocurrency API
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Recharts](https://recharts.org) for beautiful React charts
- [Lucide](https://lucide.dev) for the icon library

---

⭐ If you found this project helpful, please give it a star on GitHub!
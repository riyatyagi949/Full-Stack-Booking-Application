import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import CreateBooking from './components/CreateBooking';
import BookingList from './components/BookingList';
import { motion } from 'framer-motion';
import { Home, Calendar, List, Users } from 'lucide-react';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          {/* Navigation */}
          <nav className="glassmorphism shadow-2xl sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center justify-between h-16">
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    HomeServices
                  </span>
                </motion.div>

                <div className="flex items-center gap-1">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-lg scale-105'
                          : 'text-gray-700 hover:bg-gray-100/80 hover:backdrop-blur-sm hover:scale-105'
                      }`
                    }
                  >
                    <Calendar className="w-5 h-5" />
                    Create Booking
                  </NavLink>
                  
                  <NavLink
                    to="/bookings"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                        isActive
                          ? 'bg-green-600 text-white shadow-lg scale-105'
                          : 'text-gray-700 hover:bg-gray-100/80 hover:backdrop-blur-sm hover:scale-105'
                      }`
                    }
                  >
                    <List className="w-5 h-5" />
                    All Bookings
                  </NavLink>
                  
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                        isActive
                          ? 'bg-purple-600 text-white shadow-lg scale-105'
                          : 'text-gray-700 hover:bg-gray-100/80 hover:backdrop-blur-sm hover:scale-105'
                      }`
                    }
                  >
                    <Users className="w-5 h-5" />
                    Admin Panel
                  </NavLink>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-6 py-12">
            <Routes>
              {}
              <Route path="/" element={<CreateBooking />} />
              <Route path="/bookings" element={<BookingList />} />
              <Route path="/admin" element={<AdminPanel />} /> {
              }
              <Route path="*" element={<div className="text-center py-20"><h1>Page Not Found</h1></div>} />
            </Routes>
          </main>

          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              },
            }}
          />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

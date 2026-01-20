import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
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
        <nav className="glassmorphism shadow-2xl sticky top-0 z-50">
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
        `flex items-center gap-2 px-4 py-2 rounded-2xl font-medium transition-all ${
               isActive
               ? 'bg-blue-600 text-white shadow-lg'
         : 'text-gray-700 hover:bg-gray-100/80 hover:backdrop-blur-sm'
                }`
                    }
                  >
                    <Calendar className="w-5 h-5" />
                    Create Booking
                  </NavLink>
                  <NavLink
                    to="/bookings"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-2xl font-medium transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100/80 hover:backdrop-blur-sm'
                      }`
                    }
                  >
                    <List className="w-5 h-5" />
                    All Bookings
                  </NavLink>
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-2xl font-medium transition-all ${
                        isActive
                          ? 'bg-purple-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100/80 hover:backdrop-blur-sm'
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
              <Route path="/" element={<CreateBooking />} />
              <Route path="/bookings" element={<BookingList />} />
              <Route path="/admin" element={<BookingList />} />
            </Routes>
          </main>
        </div>

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
      </Router>
    </QueryClientProvider>
  );
}

export default App;

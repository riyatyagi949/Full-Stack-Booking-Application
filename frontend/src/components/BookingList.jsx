import { useState } from 'react';
import { useBookings, useUpdateBookingStatus } from '../hooks/useBookings';
import { motion } from 'framer-motion';
import { Loader2, Clock, CheckCircle } from 'lucide-react';

export default function BookingList() {
  const [filters, setFilters] = useState({});
  const { data, isLoading } = useBookings(filters);
  const updateStatus = useUpdateBookingStatus();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
         All Bookings
      </h1>
      
      {data?.bookings?.length === 0 ? (
        <div className="text-center py-20 glassmorphism rounded-3xl p-12">
          <CheckCircle className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">No bookings yet</h2>
          <p>Create your first booking from the home screen!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {data?.bookings.map((booking) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glassmorphism rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`px-4 py-2 rounded-2xl font-semibold ${
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  booking.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                  booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {booking.status.toUpperCase()}
                </div>
                <div className="text-xl font-bold">#{booking._id.slice(-6)}</div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{booking.service?.name}</h3>
              <p className="text-gray-600 mb-4">{booking.address}</p>
              <p className="text-sm text-gray-500 mb-6">
                <Clock className="w-4 h-4 inline mr-1" />
                {new Date(booking.scheduledAt).toLocaleString()}
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => updateStatus.mutate({ 
                    id: booking._id, 
                    status: booking.status === 'pending' ? 'assigned' : 'completed' 
                  })}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-xl transition-all"
                >
                  {booking.status === 'pending' ? 'Assign Provider' : 'Complete'}
                </button>
                <button
                  onClick={() => updateStatus.mutate({ 
                    id: booking._id, 
                    status: 'cancelled' 
                  })}
                  className="px-6 py-3 bg-red-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

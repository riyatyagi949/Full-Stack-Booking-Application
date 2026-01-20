import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';

const AdminPanel = () => {
  const queryClient = useQueryClient();
  
  // Fetch all bookings
  const { data, isLoading, error } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/api/bookings');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    }
  });

  // Update status mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Update failed');
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries(['bookings'])
  });

  if (isLoading) return <div className="text-center p-8">Loading bookings...</div>;
  if (error) return <div className="text-red-500 p-8">Error: {error.message}</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-6xl mx-auto p-8 glassmorphism rounded-3xl"
    >
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        🛠️ Admin Panel - All Bookings
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <th className="p-4 text-left rounded-tl-2xl">ID</th>
              <th className="p-4 text-left">Service</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">Scheduled</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left rounded-tr-2xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.bookings?.map((booking) => (
              <tr key={booking._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-mono text-sm">{booking._id.slice(-8)}</td>
                <td className="p-4">
                  <span className="font-semibold">{booking.service?.name || 'N/A'}</span>
                </td>
                <td className="p-4">{booking.address}</td>
                <td className="p-4">
                  {new Date(booking.scheduledAt).toLocaleString()}
                </td>
                <td>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    booking.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                    booking.status === 'assigned' ? 'bg-blue-200 text-blue-800' :
                    booking.status === 'completed' ? 'bg-green-200 text-green-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {booking.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <select 
                      onChange={(e) => updateMutation.mutate({
                        id: booking._id,
                        status: e.target.value
                      })}
                      className="px-3 py-1 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="assigned">Assigned</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data?.total === 0 && (
        <div className="text-center py-12 text-gray-500">
          No bookings yet. Create one from the Create Booking page!
        </div>
      )}
    </motion.div>
  );
};

export default AdminPanel;

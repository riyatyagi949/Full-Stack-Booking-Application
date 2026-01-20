import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { apiFetch } from '../utils/api';
import toast from 'react-hot-toast';

const AdminPanel = () => {
  const queryClient = useQueryClient();
  
  // Fetch all bookings (USING API UTILITY)
  const { data, isLoading, error } = useQuery({
    queryKey: ['bookings'],
    queryFn: () => apiFetch('/api/bookings'),
  });

  // Update status mutation (USING API UTILITY)
  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => 
      fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      }).then(res => {
        if (!res.ok) throw new Error('Update failed');
        return res.json();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings']);
      toast.success('✅ Status updated successfully!');
    },
    onError: () => toast.error('❌ Failed to update status')
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        <span className="ml-4 text-lg">Loading bookings...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <h2 className="text-2xl font-bold mb-4">Error Loading Bookings</h2>
        <p>{error.message}</p>
        <button 
          onClick={() => queryClient.invalidateQueries(['bookings'])}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-6xl mx-auto p-8 glassmorphism rounded-3xl"
    >
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        🛠️ Admin Panel - All Bookings ({data?.total || 0})
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
              <tr key={booking._id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-4 font-mono text-sm text-gray-600">
                  {booking._id.slice(-8)}
                </td>
                <td className="p-4">
                  <span className="font-semibold text-gray-900">
                    {booking.service?.name || booking.serviceId || 'N/A'}
                  </span>
                </td>
                <td className="p-4 text-gray-700 max-w-md truncate" title={booking.address}>
                  {booking.address}
                </td>
                <td className="p-4 text-gray-600">
                  {new Date(booking.scheduledAt).toLocaleString('en-IN')}
                </td>
                <td>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    booking.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                    booking.status === 'assigned' ? 'bg-blue-200 text-blue-800' :
                    booking.status === 'in-progress' ? 'bg-orange-200 text-orange-800' :
                    booking.status === 'completed' ? 'bg-green-200 text-green-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {booking.status?.toUpperCase() || 'UNKNOWN'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <select 
                      value={booking.status || 'pending'}
                      onChange={(e) => updateMutation.mutate({
                        id: booking._id,
                        status: e.target.value
                      })}
                      disabled={updateMutation.isPending}
                      className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
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

      {data?.bookings?.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 text-gray-500"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-3xl flex items-center justify-center">
            <span className="text-4xl">📋</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-600">
            No bookings yet
          </h2>
          <p className="text-lg">
            Create your first booking from the <strong>Create Booking</strong> page!
          </p>
        </motion.div>
      )}

      {updateMutation.isPending && (
        <div className="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-4 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Updating status...
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminPanel;

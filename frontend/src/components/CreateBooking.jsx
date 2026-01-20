import { useState, useEffect } from 'react';
import { Calendar, MapPin, FileText } from 'lucide-react';
import { useCreateBooking } from '../hooks/useBookings';
import { motion } from 'framer-motion';
import { apiFetch } from '../utils/api';
import { toast } from 'react-hot-toast';

export default function CreateBooking() {
  const [formData, setFormData] = useState({
    serviceId: '',
    address: '',
    scheduledAt: '',
    notes: ''
  });
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const createBooking = useCreateBooking();

  useEffect(() => {
    apiFetch('/api/services')
      .then(data => {
        setServices(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, serviceId: data[0]._id }));
        }
        setLoadingServices(false);
      })
      .catch(err => {
        console.error('Services load error:', err);
        setLoadingServices(false);
        toast.error('Failed to load services');
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    createBooking.mutate(formData);
  };

  if (loadingServices) {
    return (
      <div className="max-w-2xl mx-auto glassmorphism rounded-3xl p-12 text-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
        <p>Loading services...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto glassmorphism rounded-3xl shadow-2xl p-8"
    >
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center">
        Create New Booking
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Service
          </label>
          <select
            value={formData.serviceId}
            onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
            className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
            required
          >
            <option value="">Select a service</option>
            {services.map(service => (
              <option key={service._id} value={service._id}>
                {service.name} - ₹{service.price} ({service.duration/60}h)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Address
          </label>
          <input
            type="text"
            placeholder="Enter complete address (e.g., 123 Main St, Meerut)"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Scheduled Date & Time
          </label>
          <input
            type="datetime-local"
            value={formData.scheduledAt}
            onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
            min={new Date().toISOString().slice(0, 16)}
            className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Special Notes (Optional)
          </label>
          <textarea
            rows={3}
            placeholder="Any special instructions for the service provider..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-vertical"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={createBooking.isPending || !formData.serviceId || !formData.address || !formData.scheduledAt}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createBooking.isPending ? (
            <>
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating Booking...
            </>
          ) : (
            'Create Booking'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}

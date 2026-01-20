import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (bookingData) => {
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      if (!response.ok) throw new Error('Failed to create booking');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success(' Booking created successfully!');
    },
    onError: () => toast.error(' Failed to create booking'),
  });
};

export const useBookings = (filters = {}) => {
  return useQuery({
    queryKey: ['bookings', filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters);
      const response = await fetch(`${API_URL}/bookings?${params}`);
      if (!response.ok) throw new Error('Failed to fetch bookings');
      return response.json();
    },
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status, notes }) => {
      const response = await fetch(`${API_URL}/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });
      if (!response.ok) throw new Error('Failed to update booking');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success(' Status updated!');
    },
  });
};

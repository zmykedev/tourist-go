import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/api';
import { CalendarIcon, MapPinIcon, UserIcon, ClockIcon } from '@heroicons/react/24/outline';

interface Booking {
  id: number;
  tourist_id: number;
  driver_id: number;
  driver: {
    user: {
      name: string;
    };
    vehicle_type: string;
    vehicle_model: string;
    vehicle_color: string;
    languages: string;
    experience: number;
    rating: number;
  };
  status: string;
  booked_at: string;
  pickup_location: string;
  dropoff_location: string;
  date_time: string;
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.API.BOOKINGS.TOURIST, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching bookings');
        }

        const data = await response.json();
        setBookings(data);
        setError(null);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load bookings. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusUpdate = async (bookingId: number, newStatus: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.API.BOOKINGS.STATUS(bookingId.toString()), {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }

      // Update the local state
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: newStatus }
          : booking
      ));
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Failed to update booking status');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-fountain-blue-500)] border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]">
        <div className="text-red-500 text-center p-4">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[var(--color-fountain-blue-500)] text-white rounded-lg hover:bg-[var(--color-fountain-blue-600)]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">
            My Bookings
          </h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/tourist-request')}
            className="px-6 py-3 bg-[var(--color-fountain-blue-500)] hover:bg-[var(--color-fountain-blue-600)] dark:bg-[var(--color-fountain-blue-400)] dark:hover:bg-[var(--color-fountain-blue-500)] text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            New Booking
          </motion.button>
        </div>

        {bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-8 bg-white dark:bg-[var(--color-fountain-blue-800)] rounded-xl shadow-lg"
          >
            <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
              You have no active bookings
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-[var(--color-fountain-blue-800)] rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <UserIcon className="h-6 w-6 text-[var(--color-fountain-blue-500)]" />
                        <h3 className="text-xl font-semibold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">
                          {booking.driver.user.name}
                        </h3>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
                          <span className="font-medium">Vehicle:</span> {booking.driver.vehicle_type} - {booking.driver.vehicle_model}
                        </p>
                        <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
                          <span className="font-medium">Color:</span> {booking.driver.vehicle_color}
                        </p>
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1 text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
                            {booking.driver.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <MapPinIcon className="h-6 w-6 text-[var(--color-fountain-blue-500)]" />
                        <h3 className="text-xl font-semibold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">
                          Trip Details
                        </h3>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
                          <span className="font-medium">From:</span> {booking.pickup_location}
                        </p>
                        <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
                          <span className="font-medium">To:</span> {booking.dropoff_location}
                        </p>
                        <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
                          <span className="font-medium">Date & Time:</span> {new Date(booking.date_time).toLocaleString('en-US')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                          : booking.status === 'completed'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                          : booking.status === 'cancelled'
                          ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      {booking.status === 'pending' && (
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                          className="text-red-500 hover:text-red-600 text-sm font-medium"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
                      Booked on {new Date(booking.booked_at).toLocaleDateString('en-US')}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Bookings;

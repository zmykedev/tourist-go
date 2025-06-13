import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/api';
import { CalendarIcon, MapPinIcon, UserIcon, ClockIcon } from '@heroicons/react/24/outline';

interface Booking {
  id: string;
  driver: {
    name: string;
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
  const navigate = useNavigate();

  const getBookings = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.API.TOURISTS.BOOKINGS, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching bookings');
      }

      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-fountain-blue-500)] border-t-transparent"></div>
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
                          {booking.driver.name}
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
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                    }`}>
                      {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
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

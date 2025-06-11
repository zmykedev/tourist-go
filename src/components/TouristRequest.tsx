import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DateRangePickerWithInlineButtons from './Datepicker';
import TimePicker from './TimePicker';
import patagoniaImage from '../assets/patagonia-chile-pixabay.jpg';
import { API_ENDPOINTS } from '../config/api';
import { UserGroupIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

interface TouristRequestFormData {
  pickupLocation: string;
  destination: string;
  date: {
    startDate: Date | null;
    endDate: Date | null;
  };
  time: string;
  passengers: number;
  specialRequirements: string;
}

const inputBaseClasses = "mt-1 block w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-[var(--color-fountain-blue-900)]/50 border-[var(--color-fountain-blue-200)] dark:border-[var(--color-fountain-blue-600)] text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] placeholder-[var(--color-fountain-blue-400)] dark:placeholder-[var(--color-fountain-blue-500)] shadow-sm transition-all duration-200 focus:border-[var(--color-fountain-blue-500)] focus:ring focus:ring-[var(--color-fountain-blue-500)]/20 focus:outline-none";

const TouristRequest: React.FC = () => {
  const [formData, setFormData] = useState<TouristRequestFormData>({
    pickupLocation: '',
    destination: '',
    date: {
      startDate: null,
      endDate: null
    },
    time: '',
    passengers: 1,
    specialRequirements: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.API.TOURISTS.REQUEST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          pickup_location: formData.pickupLocation,
          dropoff_location: formData.destination,
          date_time: formData.date.startDate?.toISOString(),
          notes: `Passengers: ${formData.passengers}\nTime: ${formData.time}\nSpecial Requirements: ${formData.specialRequirements}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar la solicitud');
      }

      localStorage.setItem('requestDetails', JSON.stringify(formData));
      navigate('/drivers');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (dates: { startDate: Date | null; endDate: Date | null }) => {
    setFormData(prev => ({
      ...prev,
      date: dates
    }));
  };

  const handlePassengerChange = (increment: boolean) => {
    setFormData(prev => ({
      ...prev,
      passengers: increment 
        ? Math.min(prev.passengers + 1, 10) 
        : Math.max(prev.passengers - 1, 1)
    }));
  };

  return (
    <motion.div 
      className="min-h-screen bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)] p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm dark:bg-[var(--color-fountain-blue-800)]/90 rounded-2xl shadow-xl overflow-hidden border border-[var(--color-fountain-blue-100)] dark:border-[var(--color-fountain-blue-700)]"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="md:flex">
          <div 
            className="md:w-1/2 bg-cover bg-center p-8 relative"
            style={{
              backgroundImage: `url(${patagoniaImage})`
            }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
            
            <motion.div 
              className="h-full flex flex-col justify-center relative z-10"
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">Welcome to Chile</h2>
              <p className="text-white text-lg">Let us help you explore our beautiful country in comfort and style</p>
            </motion.div>
          </div>

          <div className="md:w-1/2 p-8">
            <motion.form 
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ x: 50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="space-y-1">
                <label className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)]">Travel Date</label>
                <DateRangePickerWithInlineButtons 
                  value={formData.date}
                  onChange={handleDateChange}
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)]">Pickup Location</label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleInputChange}
                  required
                  className={inputBaseClasses}
                  placeholder="Enter pickup location"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)]">Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  required
                  className={inputBaseClasses}
                  placeholder="Enter destination"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)]">Time</label>
                <TimePicker
                  value={formData.time}
                  onChange={(time) => handleInputChange({ target: { name: 'time', value: time } } as React.ChangeEvent<HTMLInputElement>)}
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)]">Number of Passengers</label>
                <div className="relative flex items-center">
                  <UserGroupIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-fountain-blue-500)] dark:text-[var(--color-fountain-blue-400)]" />
                  <motion.button
                    type="button"
                    onClick={() => handlePassengerChange(false)}
                    disabled={formData.passengers <= 1}
                    className={`absolute left-12 top-1/2 transform -translate-y-1/2 p-1 rounded-lg 
                      ${formData.passengers <= 1 
                        ? 'text-[var(--color-fountain-blue-300)] dark:text-[var(--color-fountain-blue-600)]' 
                        : 'text-[var(--color-fountain-blue-500)] dark:text-[var(--color-fountain-blue-400)] hover:bg-[var(--color-fountain-blue-100)] dark:hover:bg-[var(--color-fountain-blue-700)]'
                      } transition-colors duration-200`}
                    whileHover={formData.passengers > 1 ? { scale: 1.1 } : {}}
                    whileTap={formData.passengers > 1 ? { scale: 0.95 } : {}}
                  >
                    <MinusIcon className="w-5 h-5" />
                  </motion.button>
                  <input
                    type="number"
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    required
                    className={`${inputBaseClasses} pl-28 pr-20 text-center`}
                    readOnly
                  />
                  <motion.button
                    type="button"
                    onClick={() => handlePassengerChange(true)}
                    disabled={formData.passengers >= 10}
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-lg 
                      ${formData.passengers >= 10 
                        ? 'text-[var(--color-fountain-blue-300)] dark:text-[var(--color-fountain-blue-600)]' 
                        : 'text-[var(--color-fountain-blue-500)] dark:text-[var(--color-fountain-blue-400)] hover:bg-[var(--color-fountain-blue-100)] dark:hover:bg-[var(--color-fountain-blue-700)]'
                      } transition-colors duration-200`}
                    whileHover={formData.passengers < 10 ? { scale: 1.1 } : {}}
                    whileTap={formData.passengers < 10 ? { scale: 0.95 } : {}}
                  >
                    <PlusIcon className="w-5 h-5" />
                  </motion.button>
                </div>
                <p className="mt-1 text-xs text-[var(--color-fountain-blue-500)] dark:text-[var(--color-fountain-blue-400)]">
                  Maximum 10 passengers
                </p>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)]">Special Requirements</label>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  rows={3}
                  className={`${inputBaseClasses} resize-none`}
                  placeholder="Do you have any special requirements?"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className={`w-full ${isLoading ? 'bg-[var(--color-fountain-blue-400)]' : 'bg-[var(--color-fountain-blue-500)] hover:bg-[var(--color-fountain-blue-600)]'} dark:bg-[var(--color-fountain-blue-400)] dark:hover:bg-[var(--color-fountain-blue-500)] text-white py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center shadow-lg hover:shadow-xl`}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Processing...
                  </>
                ) : (
                  'Continue to Select Driver'
                )}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TouristRequest;


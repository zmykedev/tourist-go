import { motion } from 'framer-motion';
import { useState } from 'react';
import DateRangePickerWithInlineButtons from './Datepicker';
import patagoniaImage from '../assets/patagonia-chile-pixabay.jpg';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
              <div>
                <label className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)]">Travel Date</label>
                <DateRangePickerWithInlineButtons 
                  value={formData.date}
                  onChange={handleDateChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)]">Pickup Location</label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-[var(--color-fountain-blue-300)] dark:border-[var(--color-fountain-blue-600)] shadow-sm focus:border-[var(--color-fountain-blue-500)] focus:ring-[var(--color-fountain-blue-500)] dark:bg-[var(--color-fountain-blue-900)] dark:text-white"
                  placeholder="Enter pickup location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)]">Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-[var(--color-fountain-blue-300)] dark:border-[var(--color-fountain-blue-600)] shadow-sm focus:border-[var(--color-fountain-blue-500)] focus:ring-[var(--color-fountain-blue-500)] dark:bg-[var(--color-fountain-blue-900)] dark:text-white"
                  placeholder="Enter destination"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)]">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-[var(--color-fountain-blue-300)] dark:border-[var(--color-fountain-blue-600)] shadow-sm focus:border-[var(--color-fountain-blue-500)] focus:ring-[var(--color-fountain-blue-500)] dark:bg-[var(--color-fountain-blue-900)] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)]">Number of Passengers</label>
                <input
                  type="number"
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleInputChange}
                  min="1"
                  required
                  className="mt-1 block w-full rounded-md border-[var(--color-fountain-blue-300)] dark:border-[var(--color-fountain-blue-600)] shadow-sm focus:border-[var(--color-fountain-blue-500)] focus:ring-[var(--color-fountain-blue-500)] dark:bg-[var(--color-fountain-blue-900)] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)]">Special Requirements</label>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-[var(--color-fountain-blue-300)] dark:border-[var(--color-fountain-blue-600)] shadow-sm focus:border-[var(--color-fountain-blue-500)] focus:ring-[var(--color-fountain-blue-500)] dark:bg-[var(--color-fountain-blue-900)] dark:text-white"
                  placeholder="Do you have any special requirements?"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-[var(--color-fountain-blue-500)] hover:bg-[var(--color-fountain-blue-600)] dark:bg-[var(--color-fountain-blue-400)] dark:hover:bg-[var(--color-fountain-blue-500)] text-white py-3 px-6 rounded-lg transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Request Driver
              </motion.button>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TouristRequest;


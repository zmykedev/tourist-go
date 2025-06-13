import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClockIcon } from '@heroicons/react/24/outline';
import './TimePicker.css';

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  className?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState('AM');
  const [tempHour, setTempHour] = useState('12');
  const [tempMinute, setTempMinute] = useState('00');
  const [tempPeriod, setTempPeriod] = useState('AM');
  const timePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parse initial value
    if (value) {
      const date = new Date(`2000-01-01T${value}`);
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      
      hours = hours % 12;
      hours = hours ? hours : 12;

      setSelectedHour(hours.toString().padStart(2, '0'));
      setSelectedMinute(minutes.toString().padStart(2, '0'));
      setSelectedPeriod(period);
      setTempHour(hours.toString().padStart(2, '0'));
      setTempMinute(minutes.toString().padStart(2, '0'));
      setTempPeriod(period);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timePickerRef.current && !timePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const handleTimeSelection = (hour: string, minute: string, period: string) => {
    let hours = parseInt(hour);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    const timeString = `${hours.toString().padStart(2, '0')}:${minute}`;
    if (isOpen) {
      onChange(timeString);
    }
  };

  const handleHourClick = (hour: string) => {
    setTempHour(hour);
  };

  const handleMinuteClick = (minute: string) => {
    setTempMinute(minute);
  };

  const handlePeriodClick = (period: string) => {
    setTempPeriod(period);
  };

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedHour(tempHour);
    setSelectedMinute(tempMinute);
    setSelectedPeriod(tempPeriod);
    handleTimeSelection(tempHour, tempMinute, tempPeriod);
    setIsOpen(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    setTempHour(selectedHour);
    setTempMinute(selectedMinute);
    setTempPeriod(selectedPeriod);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={timePickerRef}>
      <div 
        className={`relative cursor-pointer ${className}`}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        <ClockIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-fountain-blue-500)] dark:text-[var(--color-fountain-blue-400)]" />
        <input
          type="text"
          value={`${selectedHour}:${selectedMinute} ${selectedPeriod}`}
          readOnly
          className="w-full pl-12 pr-4 py-3 rounded-xl border bg-white/50 dark:bg-[var(--color-fountain-blue-900)]/50 border-[var(--color-fountain-blue-200)] dark:border-[var(--color-fountain-blue-600)] text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-fountain-blue-500)]/20 focus:border-[var(--color-fountain-blue-500)]"
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 mt-2 p-4 bg-white dark:bg-[var(--color-fountain-blue-800)] rounded-xl shadow-lg border border-[var(--color-fountain-blue-200)] dark:border-[var(--color-fountain-blue-600)] w-72"
          >
            <div className="grid grid-cols-3 gap-4">
              {/* Hours */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)]">Hour</h3>
                <div className="grid grid-cols-3 gap-1">
                  {hours.map((hour) => (
                    <motion.button
                      key={hour}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleHourClick(hour);
                      }}
                      className={`p-2 text-sm mx-auto rounded-lg transition-colors ${
                        tempHour === hour
                          ? 'bg-[var(--color-fountain-blue-500)] text-white'
                          : 'hover:bg-[var(--color-fountain-blue-100)] dark:hover:bg-[var(--color-fountain-blue-700)] text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)]'
                      }`}
                    >
                      {hour}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Minutes */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)]">Minute</h3>
                <div className="h-[150px] overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-2 gap-1 pr-2">
                    {minutes.map((minute) => (
                      <motion.button
                        key={minute}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleMinuteClick(minute);
                        }}
                        className={`p-2 text-sm rounded-lg transition-colors mx-auto ${
                          tempMinute === minute
                            ? 'bg-[var(--color-fountain-blue-500)] text-white'
                            : 'hover:bg-[var(--color-fountain-blue-100)] dark:hover:bg-[var(--color-fountain-blue-700)] text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)]'
                        }`}
                      >
                        {minute}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* AM/PM */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)]">Period</h3>
                <div className="flex flex-col gap-1">
                  {['AM', 'PM'].map((period) => (
                    <motion.button
                      key={period}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePeriodClick(period);
                      }}
                      className={`p-2 text-sm rounded-lg transition-colors ${
                        tempPeriod === period
                          ? 'bg-[var(--color-fountain-blue-500)] text-white'
                          : 'hover:bg-[var(--color-fountain-blue-100)] dark:hover:bg-[var(--color-fountain-blue-700)] text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)]'
                      }`}
                    >
                      {period}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-[var(--color-fountain-blue-200)] dark:border-[var(--color-fountain-blue-600)]">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleCancel(e)}
                className="px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-[var(--color-fountain-blue-700)] text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)] hover:bg-gray-200 dark:hover:bg-[var(--color-fountain-blue-600)] transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleApply(e)}
                className="px-4 py-2 text-sm rounded-lg bg-[var(--color-fountain-blue-500)] text-white hover:bg-[var(--color-fountain-blue-600)] transition-colors"
              >
                Apply
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimePicker; 
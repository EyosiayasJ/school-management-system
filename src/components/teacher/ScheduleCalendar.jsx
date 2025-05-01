import { useState } from 'react';
import PropTypes from 'prop-types';

// Helper function to get days in month
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper function to get day of week the month starts on (0-6, Sunday-Saturday)
const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

// Helper to format date as YYYY-MM-DD for comparison
const formatDateForComparison = (date) => {
  return date.toISOString().split('T')[0];
};

const ScheduleCalendar = ({ selectedDate, onDateSelect, events = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  
  // Get current date info
  const today = new Date();
  const todayDateString = formatDateForComparison(today);
  
  // Get calendar data
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  
  // Days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Generate calendar days array
  const calendarDays = [];
  
  // Add empty slots for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }
  
  // Handle month navigation
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  // Handle date selection
  const handleDateClick = (day) => {
    if (day === null) return;
    
    const newDate = new Date(currentYear, currentMonth, day);
    onDateSelect(newDate);
  };
  
  // Check if a specific day has events
  const hasEvents = (day) => {
    if (day === null) return false;
    
    const dateToCheck = new Date(currentYear, currentMonth, day);
    const dateString = formatDateForComparison(dateToCheck);
    
    return events.some(event => formatDateForComparison(new Date(event.date)) === dateString);
  };
  
  // Check if a day is the selected date
  const isSelectedDay = (day) => {
    if (day === null) return false;
    
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };
  
  // Check if a day is today
  const isToday = (day) => {
    if (day === null) return false;
    
    const dateToCheck = new Date(currentYear, currentMonth, day);
    return formatDateForComparison(dateToCheck) === todayDateString;
  };
  
  return (
    <div className="w-full">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-1 rounded text-gray-600 hover:bg-gray-100"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h3 className="text-lg font-medium text-gray-900">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        
        <button
          onClick={goToNextMonth}
          className="p-1 rounded text-gray-600 hover:bg-gray-100"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Days of week headers */}
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map((day, index) => (
          <div
            key={`day-${index}`}
            className={`
              aspect-square flex flex-col items-center justify-center relative
              ${day === null ? 'invisible' : 'cursor-pointer hover:bg-gray-100'}
              ${isSelectedDay(day) ? 'bg-blue-500 text-white hover:bg-blue-600 rounded-full' : ''}
              ${isToday(day) && !isSelectedDay(day) ? 'border border-blue-500 rounded-full' : ''}
              text-sm
            `}
            onClick={() => handleDateClick(day)}
          >
            {day}
            {hasEvents(day) && (
              <div className={`absolute bottom-1 w-1 h-1 rounded-full ${isSelectedDay(day) ? 'bg-white' : 'bg-blue-500'}`}></div>
            )}
          </div>
        ))}
      </div>
      
      {/* Today's Events */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Events for {selectedDate.toLocaleDateString()}</h4>
        <div className="space-y-2">
          {events
            .filter(event => formatDateForComparison(new Date(event.date)) === formatDateForComparison(selectedDate))
            .map((event, index) => (
              <div key={index} className="flex items-center p-2 bg-gray-50 rounded-md">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <div className="text-sm text-gray-700">{event.title}</div>
              </div>
            ))}
          {events.filter(event => formatDateForComparison(new Date(event.date)) === formatDateForComparison(selectedDate)).length === 0 && (
            <div className="text-xs text-gray-500 italic">No events scheduled</div>
          )}
        </div>
      </div>
    </div>
  );
};

ScheduleCalendar.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onDateSelect: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
      title: PropTypes.string.isRequired
    })
  )
};

export default ScheduleCalendar; 
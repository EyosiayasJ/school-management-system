import { useState } from 'react';
import { motion } from 'framer-motion';

const EventsCalendar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('June'); // Default to current month
  
  // Sample events data
  const events = [
    { id: 1, title: 'End of Year Ceremony', date: '2023-06-15', time: '10:00 AM', location: 'Main Auditorium', type: 'ceremony', branch: 'Main Campus' },
    { id: 2, title: 'Parent-Teacher Meeting', date: '2023-06-22', time: '4:00 PM', location: 'Conference Hall', type: 'meeting', branch: 'North Branch' },
    { id: 3, title: 'Science Fair', date: '2023-06-10', time: '9:00 AM', location: 'School Grounds', type: 'academic', branch: 'Main Campus' },
    { id: 4, title: 'Basketball Tournament', date: '2023-06-25', time: '2:00 PM', location: 'Sports Complex', type: 'sports', branch: 'East Branch' },
    { id: 5, title: 'Art Exhibition', date: '2023-06-18', time: '11:00 AM', location: 'Art Gallery', type: 'cultural', branch: 'South Branch' },
    { id: 6, title: 'Career Counseling Day', date: '2023-06-30', time: '9:30 AM', location: 'Multipurpose Hall', type: 'workshop', branch: 'West Branch' },
  ];

  // Filter events based on search term and selected filter
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.branch.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || event.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Format date to more readable format
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get unique event types for filter dropdown
  const eventTypes = ['all', ...new Set(events.map(event => event.type))];

  // Generate calendar days for the current month view
  const generateCalendarDays = () => {
    // This is a simplified calendar generation for demo purposes
    // In a real app, you would calculate actual days based on the selected month
    const days = [];
    const daysInMonth = 30; // Assuming June has 30 days
    
    for (let i = 1; i <= daysInMonth; i++) {
      // Check if there are any events on this day
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === i;
      });
      
      days.push({
        day: i,
        events: dayEvents,
        isToday: i === 15, // Just for demo, assuming today is the 15th
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Events Calendar</h1>
        <p className="mt-1 text-sm text-gray-500">Schedule and manage school events, activities, and reminders</p>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
        {/* Actions Bar */}
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            {/* Search */}
            <div className="w-full md:w-1/3">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search events..."
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Type:</span>
              <div className="relative inline-flex">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  {eventTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type === 'all' ? 'All Events' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Month Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Month:</span>
              <div className="relative inline-flex">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Event
              </button>
            </div>
          </div>
        </div>
        
        {/* Calendar View */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Calendar Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{selectedMonth} 2023</h2>
          </div>
          
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-px bg-gray-200 border-b border-gray-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="bg-white px-2 py-3">
                <p className="text-xs font-medium text-center text-gray-500">{day}</p>
              </div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {/* Empty cells for days before the 1st of the month (assuming June starts on a Thursday) */}
            {[...Array(4)].map((_, index) => (
              <div key={`empty-start-${index}`} className="bg-gray-50 px-2 py-3 h-32"></div>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map((day) => (
              <motion.div 
                key={day.day}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={`bg-white px-2 py-2 h-32 overflow-y-auto ${day.isToday ? 'ring-2 ring-blue-500 ring-inset' : ''}`}
              >
                <p className={`text-sm font-medium ${day.isToday ? 'text-blue-600' : 'text-gray-700'}`}>{day.day}</p>
                {day.events.map((event) => (
                  <div 
                    key={event.id} 
                    className={`mt-1 px-2 py-1 text-xs rounded-md ${getEventTypeColor(event.type)}`}
                  >
                    <p className="font-medium truncate">{event.title}</p>
                    <p className="truncate">{event.time}</p>
                  </div>
                ))}
              </motion.div>
            ))}
            
            {/* Empty cells for days after the end of the month */}
            {[...Array(2)].map((_, index) => (
              <div key={`empty-end-${index}`} className="bg-gray-50 px-2 py-3 h-32"></div>
            ))}
          </div>
        </div>
        
        {/* Upcoming Events List */}
        <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
          </div>
          
          <ul className="divide-y divide-gray-200">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <motion.li 
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-blue-600">{event.title}</h3>
                      <p className="mt-1 text-xs text-gray-500">{formatDate(event.date)} at {event.time}</p>
                      <div className="mt-1 flex items-center">
                        <svg className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-xs text-gray-500">{event.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEventTypeBadgeColor(event.type)}`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                      <span className="ml-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {event.branch}
                      </span>
                      <div className="ml-4 flex-shrink-0 flex space-x-2">
                        <button className="p-1 rounded-full text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <span className="sr-only">View</span>
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="p-1 rounded-full text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <span className="sr-only">Edit</span>
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))
            ) : (
              <li className="px-6 py-6 text-center text-gray-500">
                No events found matching your search criteria.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Helper function to get color classes based on event type
const getEventTypeColor = (type) => {
  switch (type) {
    case 'ceremony':
      return 'bg-purple-100 text-purple-800';
    case 'meeting':
      return 'bg-blue-100 text-blue-800';
    case 'academic':
      return 'bg-green-100 text-green-800';
    case 'sports':
      return 'bg-orange-100 text-orange-800';
    case 'cultural':
      return 'bg-pink-100 text-pink-800';
    case 'workshop':
      return 'bg-indigo-100 text-indigo-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Helper function to get badge color classes based on event type
const getEventTypeBadgeColor = (type) => {
  switch (type) {
    case 'ceremony':
      return 'bg-purple-100 text-purple-800';
    case 'meeting':
      return 'bg-blue-100 text-blue-800';
    case 'academic':
      return 'bg-green-100 text-green-800';
    case 'sports':
      return 'bg-orange-100 text-orange-800';
    case 'cultural':
      return 'bg-pink-100 text-pink-800';
    case 'workshop':
      return 'bg-indigo-100 text-indigo-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default EventsCalendar;
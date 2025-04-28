import { useState, useEffect } from 'react';
import { events as mockEvents, branches } from '../../../mock-db.js';
import { toast } from 'react-hot-toast';
import AddEventModal from '../../components/events/AddEventModal';
import EditEventModal from '../../components/events/EditEventModal';
import ViewEventModal from '../../components/events/ViewEventModal';
import ConfirmDeleteModal from '../../components/events/ConfirmDeleteModal';

const EventsCalendar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [allEvents, setAllEvents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Initialize events from mock database
  useEffect(() => {
    setAllEvents(mockEvents);
  }, []);

  // Filter events based on search term and selected filter
  const filteredEvents = allEvents.filter(event => {
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
  const eventTypes = ['all', ...new Set(allEvents.map(event => event.type))];

  // Generate calendar days for the current month view
  const generateCalendarDays = () => {
    const days = [];
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
    const lastDayOfMonth = new Date(selectedYear, selectedMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();
    
    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < startingDay; i++) {
      days.push({ day: null, events: [], isToday: false });
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(selectedYear, selectedMonth, i);
      const dayEvents = filteredEvents.filter(event => {
        const eventDate = new Date(event.start);
        return eventDate.getDate() === i && 
               eventDate.getMonth() === selectedMonth && 
               eventDate.getFullYear() === selectedYear;
      });
      
      const today = new Date();
      const isToday = currentDate.getDate() === today.getDate() && 
                     currentDate.getMonth() === today.getMonth() && 
                     currentDate.getFullYear() === today.getFullYear();
      
      days.push({
        day: i,
        events: dayEvents,
        isToday: isToday,
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  // Handle Add Event
  const handleAddEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: Date.now(), // Generate a unique ID
    };
    setAllEvents(prev => [...prev, eventWithId]);
    setShowAddModal(false);
    toast.success('Event added successfully');
  };

  // Handle Edit Event
  const handleEditEvent = (updatedEvent) => {
    setAllEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    setShowEditModal(false);
    setSelectedEvent(null);
    toast.success('Event updated successfully');
  };

  // Handle Delete Event
  const handleDeleteEvent = (event) => {
    setAllEvents(prev => prev.filter(e => e.id !== event.id));
    setShowDeleteModal(false);
    setSelectedEvent(null);
    toast.success('Event deleted successfully');
  };

  // Handle View/Edit/Delete Event
  const handleEventAction = (event, action) => {
    setSelectedEvent(event);
    switch (action) {
      case 'view':
        setShowViewModal(true);
        break;
      case 'edit':
        setShowEditModal(true);
        break;
      case 'delete':
        setShowDeleteModal(true);
        break;
      default:
        break;
    }
  };

  // Handle month navigation
  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  // Handle year navigation
  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

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
            
            {/* Month and Year Selector */}
            <div className="flex items-center space-x-2">
              <div className="relative inline-flex">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                >
                  {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
                    <option key={month} value={index}>{month}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="relative inline-flex">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={selectedYear}
                  onChange={handleYearChange}
                >
                  {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map((year) => (
                    <option key={year} value={year}>{year}</option>
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
              <button 
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
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
            <h2 className="text-lg font-semibold text-gray-900">
              {new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
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
            {/* Calendar days */}
            {calendarDays.map((day, index) => (
              <div 
                key={index}
                className={`bg-white px-2 py-2 h-32 overflow-y-auto ${day.isToday ? 'ring-2 ring-blue-500 ring-inset' : ''}`}
              >
                {day.day && (
                  <>
                    <p className={`text-sm font-medium ${day.isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                      {day.day}
                    </p>
                    {day.events.map((event) => (
                      <div 
                        key={event.id} 
                        className={`mt-1 px-2 py-1 text-xs rounded-md ${getEventTypeColor(event.type)} cursor-pointer`}
                        onClick={() => handleEventAction(event, 'view')}
                      >
                        <p className="font-medium truncate">{event.title}</p>
                        <p className="truncate">{new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    ))}
                  </>
                )}
              </div>
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
              filteredEvents.map((event) => (
                <li 
                  key={event.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-blue-600">{event.title}</h3>
                      <p className="mt-1 text-xs text-gray-500">{formatDate(event.start)} at {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
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
                        <button 
                          onClick={() => handleEventAction(event, 'view')}
                          className="p-1 rounded-full text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          aria-label="View event"
                        >
                          <span className="sr-only">View</span>
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleEventAction(event, 'edit')}
                          className="p-1 rounded-full text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          aria-label="Edit event"
                        >
                          <span className="sr-only">Edit</span>
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleEventAction(event, 'delete')}
                          className="p-1 rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          aria-label="Delete event"
                        >
                          <span className="sr-only">Delete</span>
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-6 py-6 text-center text-gray-500">
                No events found matching your search criteria.
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <AddEventModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddEvent}
          branches={branches}
        />
      )}

      {/* Edit Event Modal */}
      {showEditModal && selectedEvent && (
        <EditEventModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedEvent(null);
          }}
          onSubmit={handleEditEvent}
          event={selectedEvent}
          branches={branches}
        />
      )}

      {/* View Event Modal */}
      {showViewModal && selectedEvent && (
        <ViewEventModal
          isOpen={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setSelectedEvent(null);
          }}
          event={selectedEvent}
        />
      )}

      {/* Delete Event Modal */}
      {showDeleteModal && selectedEvent && (
        <ConfirmDeleteModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedEvent(null);
          }}
          onConfirm={() => handleDeleteEvent(selectedEvent)}
          event={selectedEvent}
        />
      )}
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
    case 'fair':
      return 'bg-green-100 text-green-800';
    case 'sports':
      return 'bg-orange-100 text-orange-800';
    case 'competition':
      return 'bg-pink-100 text-pink-800';
    case 'training':
      return 'bg-indigo-100 text-indigo-800';
    case 'picnic':
      return 'bg-yellow-100 text-yellow-800';
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
    case 'fair':
      return 'bg-green-100 text-green-800';
    case 'sports':
      return 'bg-orange-100 text-orange-800';
    case 'competition':
      return 'bg-pink-100 text-pink-800';
    case 'training':
      return 'bg-indigo-100 text-indigo-800';
    case 'picnic':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default EventsCalendar;
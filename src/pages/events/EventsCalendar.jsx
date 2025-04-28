import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import CustomToolbar from './CustomToolbar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import { events as mockEvents, branches } from '../../../mock-db.js';
import { toast } from 'react-hot-toast';
import AddEventModal from '../../components/events/AddEventModal';
import EditEventModal from '../../components/events/EditEventModal';
import ViewEventModal from '../../components/events/ViewEventModal';
import ConfirmDeleteModal from '../../components/events/ConfirmDeleteModal';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const locales = {
  'en-US': enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const EventsCalendar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [allEvents, setAllEvents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // Initialize events from mock database
  useEffect(() => {
    console.log('Loading mock events:', mockEvents);
    const savedEvents = localStorage.getItem('events');
    if (savedEvents && JSON.parse(savedEvents).length > 0) {
      console.log('Loading saved events:', JSON.parse(savedEvents));
      setAllEvents(JSON.parse(savedEvents));
    } else {
      console.log('Setting mock events');
      setAllEvents(mockEvents);
      localStorage.setItem('events', JSON.stringify(mockEvents));
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    console.log('Events updated:', allEvents);
    localStorage.setItem('events', JSON.stringify(allEvents));
  }, [allEvents]);

  // Filter events based on search term and selected filter
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.branch.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || event.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  console.log('Filtered events:', filteredEvents);

  // Format events for react-big-calendar
  const calendarEvents = filteredEvents.map(event => {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);
    console.log('Formatting event:', event.title, 'Start:', startDate, 'End:', endDate);
    
    return {
      ...event,
      start: startDate,
      end: endDate,
      title: event.title,
      resource: event
    };
  });

  console.log('Calendar events:', calendarEvents);

  // Handle Add Event
  const handleAddEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: Date.now(),
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

  // Handle calendar event selection
  const handleSelectEvent = (event) => {
    handleEventAction(event.resource, 'view');
  };

  // Handle calendar slot selection (for adding new events)
  const handleSelectSlot = (slotInfo) => {
    const newEvent = {
      start: slotInfo.start,
      end: slotInfo.end,
      title: '',
      location: '',
      type: 'meeting',
      branch: branches[0]
    };
    setSelectedEvent(newEvent);
    setShowAddModal(true);
  };

  // Handle month/year change
  const handleMonthYearChange = (newDate) => {
    setSelectedMonth(newDate.getMonth());
    setSelectedYear(newDate.getFullYear());
  };

  // Generate month options
  const months = Array.from({ length: 12 }, (_, i) => 
    new Date(2000, i, 1).toLocaleString('default', { month: 'long' })
  );

  // Generate year options (current year ± 5 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  return (
    <div className="py-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.3 }} 
          className="text-3xl font-bold text-gray-900"
        >
          Events Calendar
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.3, delay: 0.1 }} 
          className="mt-1 text-sm text-gray-500"
        >
          Manage and track all school events, meetings, and activities
        </motion.p>
      </div>

      {/* Action Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.3 }} 
          className="bg-white shadow rounded-lg p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            {/* Search */}
            <div className="w-full md:w-2/5 mr-6">
  <label htmlFor="search" className="sr-only">Search</label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
      </svg>
    </div>
    <input
      id="search"
      type="search"
      placeholder="Search events..."
      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-base"
      style={{ minWidth: 320, maxWidth: 500 }}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
</div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Type:</span>
                <div className="relative inline-flex">
                  <select
                    className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                  >
                    <option value="all">All Events</option>
                    <option value="orientation">Orientation</option>
                    <option value="workshop">Workshop</option>
                    <option value="training">Training</option>
                    <option value="certification">Certification</option>
                    <option value="graduation">Graduation</option>
                    <option value="meeting">Meeting</option>
                    <option value="fair">Fair</option>
                    <option value="competition">Competition</option>
                  </select>
                </div>
              </div>

              {/* Add Event Button */}
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
        </motion.div>

        {/* Calendar View */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.3, delay: 0.1 }} 
          className="bg-white shadow rounded-lg overflow-hidden"
        >
          <div className="p-6">
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              views={['month', 'week', 'day', 'agenda']}
              defaultView="month"
              date={new Date(selectedYear, selectedMonth)}
              onNavigate={handleMonthYearChange}
              components={{ toolbar: CustomToolbar }}
              eventPropGetter={(event) => ({
                style: (() => {
                    // getEventTypeColor returns e.g. 'bg-purple-100 text-purple-800'
                    const colorClass = getEventTypeColor(event.resource?.type || event.type);
                    // Map Tailwind classes to hex codes
                    const colorMap = {
                      'bg-purple-100': '#F3E8FF', 'text-purple-800': '#6D28D9',
                      'bg-blue-100': '#DBEAFE', 'text-blue-800': '#1E40AF',
                      'bg-green-100': '#D1FAE5', 'text-green-800': '#065F46',
                      'bg-yellow-100': '#FEF9C3', 'text-yellow-800': '#92400E',
                      'bg-indigo-100': '#E0E7FF', 'text-indigo-800': '#3730A3',
                      'bg-pink-100': '#FCE7F3', 'text-pink-800': '#9D174D',
                      'bg-orange-100': '#FFEDD5', 'text-orange-800': '#9A3412',
                      'bg-red-100': '#FECACA', 'text-red-800': '#991B1B',
                      'bg-gray-100': '#F3F4F6', 'text-gray-800': '#1F2937',
                    };
                    const [bgClass, textClass] = colorClass.split(' ');
                    return {
                      backgroundColor: colorMap[bgClass] || '#DBEAFE',
                      color: colorMap[textClass] || '#1E40AF',
                      border: `1px solid ${colorMap[bgClass]?.replace('100', '400') || '#60A5FA'}`,
                      borderRadius: '12px',
                      padding: '2px 8px',
                      margin: '1px 0',
                      width: '100%',
                      minWidth: '0',
                      maxWidth: '100%',
                      display: 'block',
                      fontWeight: 600,
                      fontSize: '0.92rem',
                      letterSpacing: '0.01em',
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      boxShadow: '0 1px 3px 0 rgba(59,130,246,0.07)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    };
                  })(),
              })}
              dayPropGetter={(date) => {
                const hasEvent = calendarEvents.some(event => {
                  return (
                    event.start.getFullYear() === date.getFullYear() &&
                    event.start.getMonth() === date.getMonth() &&
                    event.start.getDate() === date.getDate()
                  );
                });
                return hasEvent
                  ? { style: { backgroundColor: '#EFF6FF', transition: 'background 0.2s' } }
                  : { style: {} };
              }}
            />
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.3, delay: 0.2 }} 
          className="mt-6 bg-white shadow rounded-lg"
        >
          <div className="px-6 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Upcoming Events</h2>
          </div>
          <div className="p-6">
            {filteredEvents.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {filteredEvents.map((event, index) => (
                  <motion.li
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="py-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${getEventTypeColor(event.type)}`}>
                            <span className="text-lg font-medium">
                              {event.title.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                          <p className="text-sm text-gray-500">
                            {format(new Date(event.start), 'PPP')} at {format(new Date(event.start), 'p')}
                          </p>
                          <div className="mt-1 flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeBadgeColor(event.type)}`}>
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {event.branch}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEventAction(event, 'view')}
                          className="p-1 rounded-full text-blue-600 hover:bg-blue-100"
                          title="View"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleEventAction(event, 'edit')}
                          className="p-1 rounded-full text-blue-600 hover:bg-blue-100"
                          title="Edit"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleEventAction(event, 'delete')}
                          className="p-1 rounded-full text-red-600 hover:bg-red-100"
                          title="Delete"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No events found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddEventModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddEvent}
          branches={branches}
          initialEvent={selectedEvent}
        />
      )}

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
    case 'orientation':
      return 'bg-purple-100 text-purple-800';
    case 'workshop':
      return 'bg-blue-100 text-blue-800';
    case 'training':
      return 'bg-green-100 text-green-800';
    case 'certification':
      return 'bg-yellow-100 text-yellow-800';
    case 'graduation':
      return 'bg-indigo-100 text-indigo-800';
    case 'meeting':
      return 'bg-pink-100 text-pink-800';
    case 'fair':
      return 'bg-orange-100 text-orange-800';
    case 'competition':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Helper function to get badge color classes based on event type
const getEventTypeBadgeColor = (type) => {
  switch (type) {
    case 'orientation':
      return 'bg-purple-100 text-purple-800';
    case 'workshop':
      return 'bg-blue-100 text-blue-800';
    case 'training':
      return 'bg-green-100 text-green-800';
    case 'certification':
      return 'bg-yellow-100 text-yellow-800';
    case 'graduation':
      return 'bg-indigo-100 text-indigo-800';
    case 'meeting':
      return 'bg-pink-100 text-pink-800';
    case 'fair':
      return 'bg-orange-100 text-orange-800';
    case 'competition':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default EventsCalendar;
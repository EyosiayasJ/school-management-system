/**
 * Event Service
 * 
 * Provides functions to interact with the event-related API endpoints
 * for managing school events, calendars, and notifications.
 * 
 * @module eventService
 */

import { mockSuccess, mockError, filterBySearchTerm, paginateItems, sortItems } from '../helpers';

// Mock event data
const mockEvents = [
  {
    id: 'e1',
    title: 'Parent-Teacher Conference',
    description: 'Semester parent-teacher meeting to discuss student progress',
    start: '2023-10-15T13:00:00',
    end: '2023-10-15T18:00:00',
    location: 'Main Hall',
    type: 'meeting',
    allDay: false,
    createdBy: 'u2',
    createdAt: '2023-09-01T10:30:00'
  },
  {
    id: 'e2',
    title: 'Annual Sports Day',
    description: 'School-wide sports competition with various athletic events',
    start: '2023-11-05T09:00:00',
    end: '2023-11-05T16:00:00',
    location: 'School Grounds',
    type: 'sports',
    allDay: true,
    createdBy: 'u1',
    createdAt: '2023-09-10T14:15:00'
  },
  {
    id: 'e3',
    title: 'Science Fair',
    description: 'Exhibition of student science projects with prizes for top projects',
    start: '2023-10-25T10:00:00',
    end: '2023-10-25T15:00:00',
    location: 'Science Building',
    type: 'academic',
    allDay: false,
    createdBy: 'u3',
    createdAt: '2023-09-05T09:45:00'
  }
];

/**
 * Get all events with optional filtering, sorting, and pagination
 * 
 * @async
 * @function getEvents
 * @param {Object} options - Query options
 * @param {string} [options.search] - Search term to filter events
 * @param {string} [options.startDate] - Start date filter (YYYY-MM-DD)
 * @param {string} [options.endDate] - End date filter (YYYY-MM-DD)
 * @param {string} [options.type] - Event type filter
 * @param {number} [options.page=1] - Page number for pagination
 * @param {number} [options.perPage=10] - Items per page
 * @param {string} [options.sortBy='start'] - Field to sort by
 * @param {string} [options.sortOrder='asc'] - Sort order ('asc' or 'desc')
 * @returns {Promise<Object>} Paginated events with metadata
 */
export const getEvents = async (options = {}) => {
  try {
    const { 
      search, 
      startDate, 
      endDate, 
      type, 
      page = 1, 
      perPage = 10, 
      sortBy = 'start', 
      sortOrder = 'asc' 
    } = options;
    
    // Apply filters
    let filteredEvents = [...mockEvents];
    
    // Filter by search term
    if (search) {
      filteredEvents = filterBySearchTerm(
        filteredEvents, 
        search, 
        ['title', 'description', 'location']
      );
    }
    
    // Filter by date range
    if (startDate) {
      const startTimestamp = new Date(startDate).getTime();
      filteredEvents = filteredEvents.filter(event => {
        const eventStart = new Date(event.start).getTime();
        return eventStart >= startTimestamp;
      });
    }
    
    if (endDate) {
      const endTimestamp = new Date(endDate).getTime();
      filteredEvents = filteredEvents.filter(event => {
        const eventEnd = new Date(event.end).getTime();
        return eventEnd <= endTimestamp;
      });
    }
    
    // Filter by event type
    if (type) {
      filteredEvents = filteredEvents.filter(event => event.type === type);
    }
    
    // Sort the filtered events
    const sortedEvents = sortItems(filteredEvents, sortBy, sortOrder);
    
    // Paginate the results
    const paginatedData = paginateItems(sortedEvents, page, perPage);
    
    return mockSuccess(paginatedData);
  } catch (error) {
    return mockError('Failed to fetch events');
  }
};

/**
 * Get an event by ID
 * 
 * @async
 * @function getEventById
 * @param {string} id - Event ID
 * @returns {Promise<Object>} Event data
 */
export const getEventById = async (id) => {
  try {
    const event = mockEvents.find(e => e.id === id);
    
    if (!event) {
      return mockError('Event not found', 404);
    }
    
    return mockSuccess(event);
  } catch (error) {
    return mockError('Failed to fetch event details');
  }
};

/**
 * Create a new event
 * 
 * @async
 * @function createEvent
 * @param {Object} eventData - New event data
 * @returns {Promise<Object>} Created event
 */
export const createEvent = async (eventData) => {
  try {
    // Validate required fields
    const requiredFields = ['title', 'start', 'end'];
    const missingFields = requiredFields.filter(field => !eventData[field]);
    
    if (missingFields.length > 0) {
      return mockError(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    // Create new event with generated ID
    const newEvent = {
      id: `e${mockEvents.length + 1}`,
      createdAt: new Date().toISOString(),
      createdBy: 'u1', // Assuming current user ID
      ...eventData
    };
    
    // In a real implementation, this would add to the database
    // mockEvents.push(newEvent);
    
    return mockSuccess(newEvent);
  } catch (error) {
    return mockError('Failed to create event');
  }
};

/**
 * Update an event
 * 
 * @async
 * @function updateEvent
 * @param {string} id - Event ID
 * @param {Object} eventData - Updated event data
 * @returns {Promise<Object>} Updated event
 */
export const updateEvent = async (id, eventData) => {
  try {
    const eventIndex = mockEvents.findIndex(e => e.id === id);
    
    if (eventIndex === -1) {
      return mockError('Event not found', 404);
    }
    
    // Update event
    const updatedEvent = {
      ...mockEvents[eventIndex],
      ...eventData,
      updatedAt: new Date().toISOString()
    };
    
    // In a real implementation, this would update the database
    // mockEvents[eventIndex] = updatedEvent;
    
    return mockSuccess(updatedEvent);
  } catch (error) {
    return mockError('Failed to update event');
  }
};

/**
 * Delete an event
 * 
 * @async
 * @function deleteEvent
 * @param {string} id - Event ID
 * @returns {Promise<Object>} Success message
 */
export const deleteEvent = async (id) => {
  try {
    const eventIndex = mockEvents.findIndex(e => e.id === id);
    
    if (eventIndex === -1) {
      return mockError('Event not found', 404);
    }
    
    // In a real implementation, this would delete from the database
    // mockEvents.splice(eventIndex, 1);
    
    return mockSuccess({ message: 'Event deleted successfully' });
  } catch (error) {
    return mockError('Failed to delete event');
  }
};

/**
 * Get event types for filtering
 * 
 * @async
 * @function getEventTypes
 * @returns {Promise<Object>} List of event types
 */
export const getEventTypes = async () => {
  try {
    const eventTypes = [
      { id: 'academic', name: 'Academic' },
      { id: 'sports', name: 'Sports' },
      { id: 'cultural', name: 'Cultural' },
      { id: 'meeting', name: 'Meeting' },
      { id: 'holiday', name: 'Holiday' },
      { id: 'other', name: 'Other' }
    ];
    
    return mockSuccess(eventTypes);
  } catch (error) {
    return mockError('Failed to fetch event types');
  }
};
/**
 * Teacher Service
 * 
 * Provides functions to interact with the teacher-related API endpoints
 * for managing teachers, including CRUD operations and scheduling.
 * 
 * @module teacherService
 */

import { mockSuccess, mockError, filterBySearchTerm, paginateItems, sortItems } from '../helpers';

// Mock teacher data
const mockTeachers = [
  {
    id: 't1',
    name: 'Dr. Sarah Williams',
    subject: 'Mathematics',
    qualification: 'Ph.D. in Mathematics',
    joinDate: '2021-08-10',
    contactNumber: '(206) 555-1122',
    email: 'sarah.w@example.com',
    status: 'active'
  },
  {
    id: 't2',
    name: 'Prof. James Anderson',
    subject: 'Physics',
    qualification: 'M.Sc. in Physics',
    joinDate: '2022-01-15',
    contactNumber: '(206) 555-3344',
    email: 'james.a@example.com',
    status: 'active'
  },
  {
    id: 't3',
    name: 'Ms. Emily Parker',
    subject: 'English Literature',
    qualification: 'M.A. in English',
    joinDate: '2020-09-01',
    contactNumber: '(206) 555-5566',
    email: 'emily.p@example.com',
    status: 'active'
  }
];

/**
 * Get all teachers with optional filtering, sorting, and pagination
 * 
 * @async
 * @function getTeachers
 * @param {Object} options - Query options
 * @param {string} [options.search] - Search term to filter teachers
 * @param {number} [options.page=1] - Page number for pagination
 * @param {number} [options.perPage=10] - Items per page
 * @param {string} [options.sortBy='name'] - Field to sort by
 * @param {string} [options.sortOrder='asc'] - Sort order ('asc' or 'desc')
 * @returns {Promise<Object>} Paginated teachers with metadata
 */
export const getTeachers = async (options = {}) => {
  try {
    const { search, page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc' } = options;
    
    // Filter by search term if provided
    let filteredTeachers = mockTeachers;
    if (search) {
      filteredTeachers = filterBySearchTerm(
        mockTeachers, 
        search, 
        ['name', 'email', 'subject', 'qualification']
      );
    }
    
    // Sort the filtered teachers
    const sortedTeachers = sortItems(filteredTeachers, sortBy, sortOrder);
    
    // Paginate the results
    const paginatedData = paginateItems(sortedTeachers, page, perPage);
    
    return mockSuccess(paginatedData);
  } catch (error) {
    return mockError('Failed to fetch teachers');
  }
};

/**
 * Get a teacher by ID
 * 
 * @async
 * @function getTeacherById
 * @param {string} id - Teacher ID
 * @returns {Promise<Object>} Teacher data
 */
export const getTeacherById = async (id) => {
  try {
    const teacher = mockTeachers.find(t => t.id === id);
    
    if (!teacher) {
      return mockError('Teacher not found', 404);
    }
    
    return mockSuccess(teacher);
  } catch (error) {
    return mockError('Failed to fetch teacher details');
  }
};

/**
 * Create a new teacher
 * 
 * @async
 * @function createTeacher
 * @param {Object} teacherData - New teacher data
 * @returns {Promise<Object>} Created teacher
 */
export const createTeacher = async (teacherData) => {
  try {
    // Validate required fields
    const requiredFields = ['name', 'subject', 'qualification', 'contactNumber', 'email'];
    const missingFields = requiredFields.filter(field => !teacherData[field]);
    
    if (missingFields.length > 0) {
      return mockError(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    // Create new teacher with generated ID
    const newTeacher = {
      id: `t${mockTeachers.length + 1}`,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
      ...teacherData
    };
    
    // In a real implementation, this would add to the database
    // mockTeachers.push(newTeacher);
    
    return mockSuccess(newTeacher);
  } catch (error) {
    return mockError('Failed to create teacher');
  }
};

/**
 * Update a teacher
 * 
 * @async
 * @function updateTeacher
 * @param {string} id - Teacher ID
 * @param {Object} teacherData - Updated teacher data
 * @returns {Promise<Object>} Updated teacher
 */
export const updateTeacher = async (id, teacherData) => {
  try {
    const teacherIndex = mockTeachers.findIndex(t => t.id === id);
    
    if (teacherIndex === -1) {
      return mockError('Teacher not found', 404);
    }
    
    // Update teacher
    const updatedTeacher = {
      ...mockTeachers[teacherIndex],
      ...teacherData
    };
    
    // In a real implementation, this would update the database
    // mockTeachers[teacherIndex] = updatedTeacher;
    
    return mockSuccess(updatedTeacher);
  } catch (error) {
    return mockError('Failed to update teacher');
  }
};

/**
 * Get teacher schedule
 * 
 * @async
 * @function getTeacherSchedule
 * @param {string} id - Teacher ID
 * @param {string} [startDate] - Start date (YYYY-MM-DD)
 * @param {string} [endDate] - End date (YYYY-MM-DD)
 * @returns {Promise<Object>} Teacher schedule
 */
export const getTeacherSchedule = async (id, startDate, endDate) => {
  try {
    const teacher = mockTeachers.find(t => t.id === id);
    
    if (!teacher) {
      return mockError('Teacher not found', 404);
    }
    
    // Mock schedule data
    const mockSchedule = [
      {
        id: 'sch1',
        title: 'Algebra I - Class 10A',
        start: '2023-09-18T09:00:00',
        end: '2023-09-18T10:30:00',
        location: 'Room 101',
        recurring: true,
        daysOfWeek: [1, 3, 5] // Monday, Wednesday, Friday
      },
      {
        id: 'sch2',
        title: 'Geometry - Class 9B',
        start: '2023-09-18T13:00:00',
        end: '2023-09-18T14:30:00',
        location: 'Room 103',
        recurring: true,
        daysOfWeek: [2, 4] // Tuesday, Thursday
      },
      {
        id: 'sch3',
        title: 'Department Meeting',
        start: '2023-09-20T15:00:00',
        end: '2023-09-20T16:00:00',
        location: 'Conference Room',
        recurring: false
      }
    ];
    
    return mockSuccess({
      teacher: {
        id: teacher.id,
        name: teacher.name
      },
      schedule: mockSchedule
    });
  } catch (error) {
    return mockError('Failed to fetch teacher schedule');
  }
};
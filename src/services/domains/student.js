/**
 * Student Service
 * 
 * Provides functions to interact with the student-related API endpoints
 * for managing students, including CRUD operations and status changes.
 * 
 * @module studentService
 */

import { mockSuccess, mockError, filterBySearchTerm, paginateItems, sortItems } from '../helpers';

// Mock student data
const mockStudents = [
  {
    id: 'st1',
    name: 'Emma Johnson',
    grade: '10',
    age: 16,
    gender: 'Female',
    enrollmentDate: '2023-08-15',
    parentName: 'Robert Johnson',
    contactNumber: '(206) 555-7890',
    email: 'emma.j@example.com',
    status: 'active'
  },
  {
    id: 'st2',
    name: 'Michael Chen',
    grade: '11',
    age: 17,
    gender: 'Male',
    enrollmentDate: '2022-09-01',
    parentName: 'Wei Chen',
    contactNumber: '(206) 555-1234',
    email: 'michael.c@example.com',
    status: 'active'
  },
  {
    id: 'st3',
    name: 'Sophia Rodriguez',
    grade: '9',
    age: 15,
    gender: 'Female',
    enrollmentDate: '2023-08-20',
    parentName: 'Isabella Rodriguez',
    contactNumber: '(206) 555-5678',
    email: 'sophia.r@example.com',
    status: 'active'
  }
];

/**
 * Get all students with optional filtering, sorting, and pagination
 * 
 * @async
 * @function getStudents
 * @param {Object} options - Query options
 * @param {string} [options.search] - Search term to filter students
 * @param {number} [options.page=1] - Page number for pagination
 * @param {number} [options.perPage=10] - Items per page
 * @param {string} [options.sortBy='name'] - Field to sort by
 * @param {string} [options.sortOrder='asc'] - Sort order ('asc' or 'desc')
 * @returns {Promise<Object>} Paginated students with metadata
 */
export const getStudents = async (options = {}) => {
  try {
    const { search, page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc' } = options;
    
    // Filter by search term if provided
    let filteredStudents = mockStudents;
    if (search) {
      filteredStudents = filterBySearchTerm(
        mockStudents, 
        search, 
        ['name', 'email', 'grade', 'parentName']
      );
    }
    
    // Sort the filtered students
    const sortedStudents = sortItems(filteredStudents, sortBy, sortOrder);
    
    // Paginate the results
    const paginatedData = paginateItems(sortedStudents, page, perPage);
    
    return mockSuccess(paginatedData);
  } catch (error) {
    return mockError('Failed to fetch students');
  }
};

/**
 * Get a student by ID
 * 
 * @async
 * @function getStudentById
 * @param {string} id - Student ID
 * @returns {Promise<Object>} Student data
 */
export const getStudentById = async (id) => {
  try {
    const student = mockStudents.find(s => s.id === id);
    
    if (!student) {
      return mockError('Student not found', 404);
    }
    
    return mockSuccess(student);
  } catch (error) {
    return mockError('Failed to fetch student details');
  }
};

/**
 * Create a new student
 * 
 * @async
 * @function createStudent
 * @param {Object} studentData - New student data
 * @returns {Promise<Object>} Created student
 */
export const createStudent = async (studentData) => {
  try {
    // Validate required fields
    const requiredFields = ['name', 'grade', 'gender', 'parentName', 'contactNumber', 'email'];
    const missingFields = requiredFields.filter(field => !studentData[field]);
    
    if (missingFields.length > 0) {
      return mockError(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    // Create new student with generated ID
    const newStudent = {
      id: `st${mockStudents.length + 1}`,
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'active',
      ...studentData
    };
    
    // In a real implementation, this would add to the database
    // mockStudents.push(newStudent);
    
    return mockSuccess(newStudent);
  } catch (error) {
    return mockError('Failed to create student');
  }
};

/**
 * Update a student
 * 
 * @async
 * @function updateStudent
 * @param {string} id - Student ID
 * @param {Object} studentData - Updated student data
 * @returns {Promise<Object>} Updated student
 */
export const updateStudent = async (id, studentData) => {
  try {
    const studentIndex = mockStudents.findIndex(s => s.id === id);
    
    if (studentIndex === -1) {
      return mockError('Student not found', 404);
    }
    
    // Update student
    const updatedStudent = {
      ...mockStudents[studentIndex],
      ...studentData
    };
    
    // In a real implementation, this would update the database
    // mockStudents[studentIndex] = updatedStudent;
    
    return mockSuccess(updatedStudent);
  } catch (error) {
    return mockError('Failed to update student');
  }
};

/**
 * Change student status (suspend, expel, etc.)
 * 
 * @async
 * @function changeStudentStatus
 * @param {string} id - Student ID
 * @param {string} status - New status
 * @param {string} [reason] - Reason for status change
 * @returns {Promise<Object>} Updated student
 */
export const changeStudentStatus = async (id, status, reason = '') => {
  try {
    const validStatuses = ['active', 'suspended', 'expelled', 'transferred', 'graduated'];
    
    if (!validStatuses.includes(status)) {
      return mockError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
    
    const studentIndex = mockStudents.findIndex(s => s.id === id);
    
    if (studentIndex === -1) {
      return mockError('Student not found', 404);
    }
    
    // Update student status
    const updatedStudent = {
      ...mockStudents[studentIndex],
      status,
      statusReason: reason || undefined,
      statusChangedAt: new Date().toISOString()
    };
    
    // In a real implementation, this would update the database
    // mockStudents[studentIndex] = updatedStudent;
    
    return mockSuccess(updatedStudent);
  } catch (error) {
    return mockError('Failed to change student status');
  }
};
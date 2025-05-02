/**
 * Health Service
 * 
 * Provides functions to interact with the health-related API endpoints
 * for managing student health records, medical information, and health events.
 * 
 * @module healthService
 */

import { mockSuccess, mockError, filterBySearchTerm, paginateItems, sortItems } from '../helpers';

// Mock health records data
const mockHealthRecords = [
  {
    id: 'hr1',
    studentId: 'st1',
    studentName: 'Emma Johnson',
    recordType: 'Medical Examination',
    date: '2023-08-20',
    details: 'Annual physical examination. No significant issues found.',
    doctor: 'Dr. Robert Chen',
    allergies: ['Peanuts'],
    medications: [],
    followUpNeeded: false,
    createdBy: 'u4',
    createdAt: '2023-08-20T14:30:00'
  },
  {
    id: 'hr2',
    studentId: 'st2',
    studentName: 'Michael Chen',
    recordType: 'Vaccination',
    date: '2023-07-15',
    details: 'Seasonal flu vaccination administered.',
    doctor: 'Dr. Sarah Williams',
    allergies: [],
    medications: ['Asthma inhaler as needed'],
    followUpNeeded: false,
    createdBy: 'u4',
    createdAt: '2023-07-15T10:45:00'
  },
  {
    id: 'hr3',
    studentId: 'st3',
    studentName: 'Sophia Rodriguez',
    recordType: 'Injury',
    date: '2023-09-05',
    details: 'Minor sprain during physical education class. Ice applied, rest recommended for 2 days.',
    doctor: 'School Nurse',
    allergies: ['Penicillin'],
    medications: [],
    followUpNeeded: true,
    followUpDate: '2023-09-07',
    createdBy: 'u5',
    createdAt: '2023-09-05T13:20:00'
  }
];

/**
 * Get all health records with optional filtering, sorting, and pagination
 * 
 * @async
 * @function getHealthRecords
 * @param {Object} options - Query options
 * @param {string} [options.search] - Search term to filter records
 * @param {string} [options.studentId] - Filter by student ID
 * @param {string} [options.recordType] - Filter by record type
 * @param {string} [options.startDate] - Start date filter (YYYY-MM-DD)
 * @param {string} [options.endDate] - End date filter (YYYY-MM-DD)
 * @param {boolean} [options.followUpNeeded] - Filter by follow-up needed
 * @param {number} [options.page=1] - Page number for pagination
 * @param {number} [options.perPage=10] - Items per page
 * @param {string} [options.sortBy='date'] - Field to sort by
 * @param {string} [options.sortOrder='desc'] - Sort order ('asc' or 'desc')
 * @returns {Promise<Object>} Paginated health records with metadata
 */
export const getHealthRecords = async (options = {}) => {
  try {
    const { 
      search, 
      studentId, 
      recordType, 
      startDate, 
      endDate, 
      followUpNeeded,
      page = 1, 
      perPage = 10, 
      sortBy = 'date', 
      sortOrder = 'desc' 
    } = options;
    
    // Apply filters
    let filteredRecords = [...mockHealthRecords];
    
    // Filter by search term
    if (search) {
      filteredRecords = filterBySearchTerm(
        filteredRecords, 
        search, 
        ['studentName', 'details', 'doctor']
      );
    }
    
    // Filter by student ID
    if (studentId) {
      filteredRecords = filteredRecords.filter(record => record.studentId === studentId);
    }
    
    // Filter by record type
    if (recordType) {
      filteredRecords = filteredRecords.filter(record => record.recordType === recordType);
    }
    
    // Filter by date range
    if (startDate) {
      const startTimestamp = new Date(startDate).getTime();
      filteredRecords = filteredRecords.filter(record => {
        const recordDate = new Date(record.date).getTime();
        return recordDate >= startTimestamp;
      });
    }
    
    if (endDate) {
      const endTimestamp = new Date(endDate).getTime();
      filteredRecords = filteredRecords.filter(record => {
        const recordDate = new Date(record.date).getTime();
        return recordDate <= endTimestamp;
      });
    }
    
    // Filter by follow-up needed
    if (followUpNeeded !== undefined) {
      filteredRecords = filteredRecords.filter(record => record.followUpNeeded === followUpNeeded);
    }
    
    // Sort the filtered records
    const sortedRecords = sortItems(filteredRecords, sortBy, sortOrder);
    
    // Paginate the results
    const paginatedData = paginateItems(sortedRecords, page, perPage);
    
    return mockSuccess(paginatedData);
  } catch (error) {
    return mockError('Failed to fetch health records');
  }
};

/**
 * Get a health record by ID
 * 
 * @async
 * @function getHealthRecordById
 * @param {string} id - Health record ID
 * @returns {Promise<Object>} Health record data
 */
export const getHealthRecordById = async (id) => {
  try {
    const record = mockHealthRecords.find(r => r.id === id);
    
    if (!record) {
      return mockError('Health record not found', 404);
    }
    
    return mockSuccess(record);
  } catch (error) {
    return mockError('Failed to fetch health record details');
  }
};

/**
 * Create a new health record
 * 
 * @async
 * @function createHealthRecord
 * @param {Object} recordData - New health record data
 * @returns {Promise<Object>} Created health record
 */
export const createHealthRecord = async (recordData) => {
  try {
    // Validate required fields
    const requiredFields = ['studentId', 'recordType', 'date', 'details'];
    const missingFields = requiredFields.filter(field => !recordData[field]);
    
    if (missingFields.length > 0) {
      return mockError(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    // Create new health record with generated ID
    const newRecord = {
      id: `hr${mockHealthRecords.length + 1}`,
      createdAt: new Date().toISOString(),
      createdBy: 'u1', // Assuming current user ID
      followUpNeeded: false, // Default value
      ...recordData
    };
    
    // In a real implementation, this would add to the database
    // mockHealthRecords.push(newRecord);
    
    return mockSuccess(newRecord);
  } catch (error) {
    return mockError('Failed to create health record');
  }
};

/**
 * Update a health record
 * 
 * @async
 * @function updateHealthRecord
 * @param {string} id - Health record ID
 * @param {Object} recordData - Updated health record data
 * @returns {Promise<Object>} Updated health record
 */
export const updateHealthRecord = async (id, recordData) => {
  try {
    const recordIndex = mockHealthRecords.findIndex(r => r.id === id);
    
    if (recordIndex === -1) {
      return mockError('Health record not found', 404);
    }
    
    // Update health record
    const updatedRecord = {
      ...mockHealthRecords[recordIndex],
      ...recordData,
      updatedAt: new Date().toISOString()
    };
    
    // In a real implementation, this would update the database
    // mockHealthRecords[recordIndex] = updatedRecord;
    
    return mockSuccess(updatedRecord);
  } catch (error) {
    return mockError('Failed to update health record');
  }
};

/**
 * Get health record types for filtering
 * 
 * @async
 * @function getHealthRecordTypes
 * @returns {Promise<Object>} List of health record types
 */
export const getHealthRecordTypes = async () => {
  try {
    const recordTypes = [
      { id: 'medical_examination', name: 'Medical Examination' },
      { id: 'vaccination', name: 'Vaccination' },
      { id: 'injury', name: 'Injury' },
      { id: 'illness', name: 'Illness' },
      { id: 'allergy', name: 'Allergy' },
      { id: 'medication', name: 'Medication' },
      { id: 'other', name: 'Other' }
    ];
    
    return mockSuccess(recordTypes);
  } catch (error) {
    return mockError('Failed to fetch health record types');
  }
};

/**
 * Get student health summary
 * 
 * @async
 * @function getStudentHealthSummary
 * @param {string} studentId - Student ID
 * @returns {Promise<Object>} Student health summary
 */
export const getStudentHealthSummary = async (studentId) => {
  try {
    // Filter records for the specific student
    const studentRecords = mockHealthRecords.filter(record => record.studentId === studentId);
    
    if (studentRecords.length === 0) {
      return mockError('No health records found for this student', 404);
    }
    
    // Get the most recent record
    const sortedRecords = sortItems(studentRecords, 'date', 'desc');
    const latestRecord = sortedRecords[0];
    
    // Compile summary data
    const summary = {
      studentId,
      studentName: latestRecord.studentName,
      allergies: latestRecord.allergies || [],
      medications: latestRecord.medications || [],
      recentRecords: sortedRecords.slice(0, 3), // Last 3 records
      followUpNeeded: sortedRecords.some(record => record.followUpNeeded),
      recordCount: studentRecords.length
    };
    
    return mockSuccess(summary);
  } catch (error) {
    return mockError('Failed to fetch student health summary');
  }
};
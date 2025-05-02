/**
 * Term Service
 * 
 * Provides functions for managing academic terms, including retrieving,
 * creating, updating, and generating reports.
 */

import { mockSuccess, mockError } from '../helpers';

// Mock terms data
const mockTerms = [
  {
    id: 't1',
    name: 'Fall 2023',
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    gradingMode: 'average',
    reportDeadline: '2023-12-20',
    isActive: true
  },
  {
    id: 't2',
    name: 'Spring 2024',
    startDate: '2024-01-15',
    endDate: '2024-05-30',
    gradingMode: 'gpa',
    reportDeadline: '2024-06-05',
    isActive: false
  }
];

/**
 * Get all terms
 * 
 * @returns {Promise<Object>} Terms data
 */
export const getAll = async () => {
  try {
    return mockSuccess(mockTerms);
  } catch (error) {
    return mockError('Failed to fetch terms');
  }
};

/**
 * Create a new term
 * 
 * @param {Object} data - Term data
 * @returns {Promise<Object>} Created term
 */
export const create = async (data) => {
  try {
    // Validate required fields
    const requiredFields = ['name', 'startDate', 'endDate', 'gradingMode', 'reportDeadline'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return mockError(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    // Create new term with ID
    const newTerm = {
      id: `t${mockTerms.length + 1}`,
      ...data,
      isActive: false
    };
    
    // In a real implementation, this would add to the database
    mockTerms.push(newTerm);
    
    return mockSuccess(newTerm);
  } catch (error) {
    return mockError('Failed to create term');
  }
};

/**
 * Update a term
 * 
 * @param {string} id - Term ID
 * @param {Object} data - Updated term data
 * @returns {Promise<Object>} Updated term
 */
export const update = async (id, data) => {
  try {
    const termIndex = mockTerms.findIndex(t => t.id === id);
    
    if (termIndex === -1) {
      return mockError('Term not found', 404);
    }
    
    // Update term
    const updatedTerm = {
      ...mockTerms[termIndex],
      ...data
    };
    
    // In a real implementation, this would update the database
    mockTerms[termIndex] = updatedTerm;
    
    return mockSuccess(updatedTerm);
  } catch (error) {
    return mockError('Failed to update term');
  }
};

/**
 * Send reports for a term
 * 
 * @param {string} id - Term ID
 * @returns {Promise<Object>} Success message
 */
export const sendReports = async (id) => {
  try {
    const term = mockTerms.find(t => t.id === id);
    
    if (!term) {
      return mockError('Term not found', 404);
    }
    
    // In a real implementation, this would trigger report generation
    return mockSuccess({ message: `Reports for ${term.name} have been generated and sent successfully.` });
  } catch (error) {
    return mockError('Failed to generate reports');
  }
};

// Export as object for named imports
export const termApi = {
  getAll,
  create,
  update,
  sendReports
};

// Export as default for default imports
export default termApi; 
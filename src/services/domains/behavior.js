/**
 * Behavior Service
 * 
 * Provides functions for retrieving and managing student behavior ratings.
 */

import { mockSuccess, mockError } from '../helpers';

// Mock behavior ratings data
const mockBehaviorRatings = [
  // Class 1, Term 1
  { id: 'b1', studentId: 'st1', classId: 'c1', termId: 't1', teacherId: 't1', score: 8, comments: 'Good participation in class' },
  { id: 'b2', studentId: 'st1', classId: 'c1', termId: 't1', teacherId: 't2', score: 7, comments: 'Occasional disruptions' },
  { id: 'b3', studentId: 'st2', classId: 'c1', termId: 't1', teacherId: 't1', score: 9, comments: 'Excellent behavior' },
  { id: 'b4', studentId: 'st2', classId: 'c1', termId: 't1', teacherId: 't2', score: 10, comments: 'Model student' },
  { id: 'b5', studentId: 'st3', classId: 'c1', termId: 't1', teacherId: 't1', score: 6, comments: 'Needs improvement in focus' },
  { id: 'b6', studentId: 'st3', classId: 'c1', termId: 't1', teacherId: 't2', score: 7, comments: 'Improving gradually' },
  
  // Class 1, Term 2
  { id: 'b7', studentId: 'st1', classId: 'c1', termId: 't2', teacherId: 't1', score: 9, comments: 'Great improvement' },
  { id: 'b8', studentId: 'st2', classId: 'c1', termId: 't2', teacherId: 't1', score: 9, comments: 'Consistently excellent' },
  
  // Class 2, Term 1
  { id: 'b9', studentId: 'st4', classId: 'c2', termId: 't1', teacherId: 't3', score: 8, comments: 'Good collaboration' },
  { id: 'b10', studentId: 'st5', classId: 'c2', termId: 't1', teacherId: 't3', score: 7, comments: 'Participates actively' }
];

/**
 * Get behavior ratings by class and term
 * 
 * @param {string} classId - Class ID
 * @param {string} termId - Term ID
 * @returns {Promise<Object>} Behavior ratings data
 */
export const getByClassTerm = async (classId, termId) => {
  try {
    if (!classId) {
      return mockError('Class ID is required');
    }
    
    if (!termId) {
      return mockError('Term ID is required');
    }
    
    const filteredRatings = mockBehaviorRatings.filter(
      r => r.classId === classId && r.termId === termId
    );
    
    return mockSuccess(filteredRatings);
  } catch (error) {
    return mockError('Failed to fetch behavior ratings');
  }
};

/**
 * Get behavior ratings by student, class, and term
 * 
 * @param {string} studentId - Student ID
 * @param {string} classId - Class ID
 * @param {string} termId - Term ID
 * @returns {Promise<Object>} Behavior ratings data
 */
export const getByStudentClassTerm = async (studentId, classId, termId) => {
  try {
    if (!studentId) {
      return mockError('Student ID is required');
    }
    
    if (!classId) {
      return mockError('Class ID is required');
    }
    
    if (!termId) {
      return mockError('Term ID is required');
    }
    
    const filteredRatings = mockBehaviorRatings.filter(
      r => r.studentId === studentId && r.classId === classId && r.termId === termId
    );
    
    return mockSuccess(filteredRatings);
  } catch (error) {
    return mockError('Failed to fetch student behavior ratings');
  }
};

/**
 * Create a new behavior rating
 * 
 * @param {Object} data - Behavior rating data
 * @returns {Promise<Object>} Created behavior rating
 */
export const create = async (data) => {
  try {
    // Validate required fields
    const requiredFields = ['studentId', 'classId', 'termId', 'teacherId', 'score'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return mockError(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    // Validate score is within valid range (1-10)
    if (data.score < 1 || data.score > 10) {
      return mockError('Score must be between 1 and 10');
    }
    
    // Create new behavior rating with ID
    const newRating = {
      id: `b${mockBehaviorRatings.length + 1}`,
      comments: data.comments || '',
      ...data
    };
    
    // In a real implementation, this would add to the database
    mockBehaviorRatings.push(newRating);
    
    return mockSuccess(newRating);
  } catch (error) {
    return mockError('Failed to create behavior rating');
  }
};

/**
 * Update a behavior rating
 * 
 * @param {string} id - Behavior rating ID
 * @param {Object} data - Updated behavior rating data
 * @returns {Promise<Object>} Updated behavior rating
 */
export const update = async (id, data) => {
  try {
    const ratingIndex = mockBehaviorRatings.findIndex(r => r.id === id);
    
    if (ratingIndex === -1) {
      return mockError('Behavior rating not found', 404);
    }
    
    // Validate score if provided
    if (data.score !== undefined && (data.score < 1 || data.score > 10)) {
      return mockError('Score must be between 1 and 10');
    }
    
    // Update behavior rating
    const updatedRating = {
      ...mockBehaviorRatings[ratingIndex],
      ...data
    };
    
    // In a real implementation, this would update the database
    mockBehaviorRatings[ratingIndex] = updatedRating;
    
    return mockSuccess(updatedRating);
  } catch (error) {
    return mockError('Failed to update behavior rating');
  }
};

// Export as object for named imports
export const behaviorApi = {
  getByClassTerm,
  getByStudentClassTerm,
  create,
  update
};

// Export as default for default imports
export default behaviorApi; 
/**
 * Grade Service
 * 
 * Provides functions for retrieving and managing student grades.
 */

import { mockSuccess, mockError } from '../helpers';

// Mock grades data
const mockGrades = [
  // Class 1, Term 1
  { id: 'g1', studentId: 'st1', classId: 'c1', termId: 't1', subjectId: 'sub1', mark: 85 },
  { id: 'g2', studentId: 'st1', classId: 'c1', termId: 't1', subjectId: 'sub2', mark: 92 },
  { id: 'g3', studentId: 'st1', classId: 'c1', termId: 't1', subjectId: 'sub3', mark: 78 },
  { id: 'g4', studentId: 'st2', classId: 'c1', termId: 't1', subjectId: 'sub1', mark: 90 },
  { id: 'g5', studentId: 'st2', classId: 'c1', termId: 't1', subjectId: 'sub2', mark: 88 },
  { id: 'g6', studentId: 'st2', classId: 'c1', termId: 't1', subjectId: 'sub3', mark: 95 },
  { id: 'g7', studentId: 'st3', classId: 'c1', termId: 't1', subjectId: 'sub1', mark: 82 },
  { id: 'g8', studentId: 'st3', classId: 'c1', termId: 't1', subjectId: 'sub2', mark: 80 },
  { id: 'g9', studentId: 'st3', classId: 'c1', termId: 't1', subjectId: 'sub3', mark: 75 },
  
  // Class 1, Term 2
  { id: 'g10', studentId: 'st1', classId: 'c1', termId: 't2', subjectId: 'sub1', mark: 88 },
  { id: 'g11', studentId: 'st1', classId: 'c1', termId: 't2', subjectId: 'sub2', mark: 94 },
  { id: 'g12', studentId: 'st1', classId: 'c1', termId: 't2', subjectId: 'sub3', mark: 82 },
  { id: 'g13', studentId: 'st2', classId: 'c1', termId: 't2', subjectId: 'sub1', mark: 92 },
  { id: 'g14', studentId: 'st2', classId: 'c1', termId: 't2', subjectId: 'sub2', mark: 90 },
  { id: 'g15', studentId: 'st2', classId: 'c1', termId: 't2', subjectId: 'sub3', mark: 97 },
  
  // Class 2, Term 1
  { id: 'g16', studentId: 'st4', classId: 'c2', termId: 't1', subjectId: 'sub1', mark: 76 },
  { id: 'g17', studentId: 'st4', classId: 'c2', termId: 't1', subjectId: 'sub2', mark: 84 },
  { id: 'g18', studentId: 'st5', classId: 'c2', termId: 't1', subjectId: 'sub1', mark: 91 },
  { id: 'g19', studentId: 'st5', classId: 'c2', termId: 't1', subjectId: 'sub2', mark: 89 }
];

/**
 * Get grades by class and term
 * 
 * @param {string} classId - Class ID
 * @param {string} termId - Term ID
 * @returns {Promise<Object>} Grades data
 */
export const getByClassTerm = async (classId, termId) => {
  try {
    if (!classId) {
      return mockError('Class ID is required');
    }
    
    if (!termId) {
      return mockError('Term ID is required');
    }
    
    const filteredGrades = mockGrades.filter(
      g => g.classId === classId && g.termId === termId
    );
    
    return mockSuccess(filteredGrades);
  } catch (error) {
    return mockError('Failed to fetch grades');
  }
};

/**
 * Get grades by student, class, and term
 * 
 * @param {string} studentId - Student ID
 * @param {string} classId - Class ID
 * @param {string} termId - Term ID
 * @returns {Promise<Object>} Grades data
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
    
    const filteredGrades = mockGrades.filter(
      g => g.studentId === studentId && g.classId === classId && g.termId === termId
    );
    
    return mockSuccess(filteredGrades);
  } catch (error) {
    return mockError('Failed to fetch student grades');
  }
};

/**
 * Create a new grade
 * 
 * @param {Object} data - Grade data
 * @returns {Promise<Object>} Created grade
 */
export const create = async (data) => {
  try {
    // Validate required fields
    const requiredFields = ['studentId', 'classId', 'termId', 'subjectId', 'mark'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return mockError(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    // Validate mark is within valid range
    if (data.mark < 0 || data.mark > 100) {
      return mockError('Mark must be between 0 and 100');
    }
    
    // Create new grade with ID
    const newGrade = {
      id: `g${mockGrades.length + 1}`,
      ...data
    };
    
    // In a real implementation, this would add to the database
    mockGrades.push(newGrade);
    
    return mockSuccess(newGrade);
  } catch (error) {
    return mockError('Failed to create grade');
  }
};

/**
 * Update a grade
 * 
 * @param {string} id - Grade ID
 * @param {Object} data - Updated grade data
 * @returns {Promise<Object>} Updated grade
 */
export const update = async (id, data) => {
  try {
    const gradeIndex = mockGrades.findIndex(g => g.id === id);
    
    if (gradeIndex === -1) {
      return mockError('Grade not found', 404);
    }
    
    // Validate mark if provided
    if (data.mark !== undefined && (data.mark < 0 || data.mark > 100)) {
      return mockError('Mark must be between 0 and 100');
    }
    
    // Update grade
    const updatedGrade = {
      ...mockGrades[gradeIndex],
      ...data
    };
    
    // In a real implementation, this would update the database
    mockGrades[gradeIndex] = updatedGrade;
    
    return mockSuccess(updatedGrade);
  } catch (error) {
    return mockError('Failed to update grade');
  }
};

// Export as object for named imports
export const gradeApi = {
  getByClassTerm,
  getByStudentClassTerm,
  create,
  update
};

// Export as default for default imports
export default gradeApi; 
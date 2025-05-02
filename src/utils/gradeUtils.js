/**
 * Grade Utility Functions
 * 
 * Provides utility functions for calculating grades, GPAs and rankings.
 */

/**
 * Calculate the average of an array of numbers
 * 
 * @param {Array<number>} arr - Array of numbers
 * @returns {number} Average value
 */
export const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length || 0;

/**
 * Convert a percentage grade to GPA
 * 
 * @param {number} mark - Percentage mark (0-100)
 * @returns {number} GPA value (0-4)
 */
const toGpa = mark => {
  if (mark >= 90) return 4.0;
  if (mark >= 80) return 3.0;
  if (mark >= 70) return 2.0;
  if (mark >= 60) return 1.0;
  return 0.0;
};

/**
 * Compute term grade based on array of marks and grading mode
 * 
 * @param {Array<number>} marks - Array of marks
 * @param {string} mode - Grading mode ('average' or 'gpa')
 * @returns {number} Computed term grade
 */
export function computeTermGrade(marks, mode = 'average') {
  if (!marks.length) return 0;
  
  return mode === 'gpa'
    ? +(average(marks.map(toGpa))).toFixed(2)
    : +average(marks).toFixed(2);
}

/**
 * Compute rankings for students based on their term grades
 * Handles ties by assigning the same rank
 * 
 * @param {Array<Object>} students - Array of student objects with termGrade property
 * @returns {Array<Object>} Students with rank property added
 */
export function computeRanks(students) {
  const sorted = [...students].sort((a, b) => b.termGrade - a.termGrade);
  
  return sorted.map((student, index, array) => ({
    ...student,
    rank: index > 0 && student.termGrade === array[index-1].termGrade
      ? array[index-1].rank
      : index + 1
  }));
}

/**
 * Convert GPA to letter grade
 * 
 * @param {number} gpa - GPA value (0-4)
 * @returns {string} Letter grade
 */
export function gpaToLetterGrade(gpa) {
  if (gpa >= 3.7) return 'A';
  if (gpa >= 3.3) return 'A-';
  if (gpa >= 3.0) return 'B+';
  if (gpa >= 2.7) return 'B';
  if (gpa >= 2.3) return 'B-';
  if (gpa >= 2.0) return 'C+';
  if (gpa >= 1.7) return 'C';
  if (gpa >= 1.3) return 'C-';
  if (gpa >= 1.0) return 'D';
  return 'F';
}

/**
 * Determine pass/fail status based on grade
 * 
 * @param {number} grade - Percentage grade
 * @param {number} passingThreshold - Passing threshold (default: 60)
 * @returns {boolean} Whether the grade is passing
 */
export function isPassing(grade, passingThreshold = 60) {
  return grade >= passingThreshold;
} 
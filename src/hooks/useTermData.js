import { useState, useEffect } from 'react';
import { termApi } from '../services/domains/term';
import gradeApi from '../services/domains/grade';
import behaviorApi from '../services/domains/behavior';
import { computeTermGrade, computeRanks, average } from '../utils/gradeUtils';

/**
 * Hook for fetching and calculating homeroom dashboard data
 * 
 * @param {string} classId - Class ID
 * @param {string} termId - Term ID
 * @param {string} gradingMode - Grading mode ('average' or 'gpa')
 * @returns {Object} Data and loading state for homeroom dashboard
 */
export function useHomeroomDashboard(classId, termId, gradingMode = 'average') {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentDetails, setStudentDetails] = useState({});

  useEffect(() => {
    async function loadData() {
      if (!classId || !termId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch grades and behavior ratings in parallel
        const [gradesRes, behaviorRes] = await Promise.all([
          gradeApi.getByClassTerm(classId, termId),
          behaviorApi.getByClassTerm(classId, termId)
        ]);
        
        if (gradesRes.status !== 200 || behaviorRes.status !== 200) {
          throw new Error('Failed to fetch grades or behavior data');
        }
        
        // Group marks and ratings by student
        const byStudent = {};
        
        // Process grades
        gradesRes.data.forEach(grade => {
          if (!byStudent[grade.studentId]) {
            byStudent[grade.studentId] = { marks: [], ratings: [] };
          }
          byStudent[grade.studentId].marks.push(grade.mark);
          byStudent[grade.studentId].subjects = byStudent[grade.studentId].subjects || {};
          byStudent[grade.studentId].subjects[grade.subjectId] = grade.mark;
        });
        
        // Process behavior ratings
        behaviorRes.data.forEach(rating => {
          if (!byStudent[rating.studentId]) {
            byStudent[rating.studentId] = { marks: [], ratings: [] };
          }
          byStudent[rating.studentId].ratings.push(rating.score);
          byStudent[rating.studentId].behaviorNotes = 
            byStudent[rating.studentId].behaviorNotes || [];
          
          if (rating.comments) {
            byStudent[rating.studentId].behaviorNotes.push({
              teacherId: rating.teacherId,
              comment: rating.comments,
              score: rating.score
            });
          }
        });
        
        // Build student array with calculated values
        const studentArray = Object.entries(byStudent).map(([studentId, data]) => {
          const termGrade = computeTermGrade(data.marks, gradingMode);
          const avgRating = data.ratings.length 
            ? +(average(data.ratings)).toFixed(1) 
            : null;
            
          return {
            studentId,
            termGrade,
            avgRating,
            subjects: data.subjects || {},
            behaviorNotes: data.behaviorNotes || []
          };
        });
        
        // Compute ranks
        const rankedStudents = computeRanks(studentArray);
        setStudents(rankedStudents);
        
        // Create lookup for individual student details
        const detailsMap = {};
        rankedStudents.forEach(student => {
          detailsMap[student.studentId] = student;
        });
        setStudentDetails(detailsMap);
        
        setError(null);
      } catch (err) {
        console.error('Error loading homeroom data:', err);
        setError('Failed to load data for homeroom dashboard');
        setStudents([]);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [classId, termId, gradingMode]);

  /**
   * Get details for a specific student
   * 
   * @param {string} studentId - Student ID
   * @returns {Object|null} Student details or null if not found
   */
  const getStudentDetails = (studentId) => {
    return studentDetails[studentId] || null;
  };

  return {
    loading,
    error,
    students,
    getStudentDetails
  };
}

/**
 * Hook for fetching and managing term reports
 * 
 * @param {string} termId - Term ID
 * @returns {Object} Functions and state for managing term reports
 */
export function useTermReports(termId) {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  /**
   * Generate and send reports for the term
   * 
   * @returns {Promise<void>}
   */
  const generateReports = async () => {
    if (!termId) {
      setError('No term selected');
      return;
    }
    
    try {
      setGenerating(true);
      setSuccess(false);
      setError(null);
      
      const response = await termApi.sendReports(termId);
      
      if (response.status === 200) {
        setSuccess(true);
      } else {
        setError(response.message || 'Failed to generate reports');
      }
    } catch (err) {
      console.error('Error generating reports:', err);
      setError('An error occurred while generating reports');
    } finally {
      setGenerating(false);
    }
  };

  return {
    generating,
    error,
    success,
    generateReports
  };
} 
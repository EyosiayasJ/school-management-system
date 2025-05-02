/**
 * Attendance Service
 * 
 * Provides functions for tracking and managing student attendance.
 */

import { mockSuccess, mockError } from '../helpers';

// Status options for attendance
export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
  EXCUSED: 'excused'
};

// Mock attendance data - in a real app, this would come from the backend
const mockAttendanceRecords = [
  // Class 1, Date 2023-11-01
  { id: 'a1', classId: 'cls-001', studentId: 'std-001', date: '2023-11-01', status: ATTENDANCE_STATUS.PRESENT, notes: '' },
  { id: 'a2', classId: 'cls-001', studentId: 'std-002', date: '2023-11-01', status: ATTENDANCE_STATUS.PRESENT, notes: '' },
  { id: 'a3', classId: 'cls-001', studentId: 'std-003', date: '2023-11-01', status: ATTENDANCE_STATUS.ABSENT, notes: 'Called in sick' },
  { id: 'a4', classId: 'cls-001', studentId: 'std-004', date: '2023-11-01', status: ATTENDANCE_STATUS.PRESENT, notes: '' },
  { id: 'a5', classId: 'cls-001', studentId: 'std-005', date: '2023-11-01', status: ATTENDANCE_STATUS.LATE, notes: 'Arrived 15 minutes late' },
  
  // Class 1, Date 2023-11-02
  { id: 'a6', classId: 'cls-001', studentId: 'std-001', date: '2023-11-02', status: ATTENDANCE_STATUS.PRESENT, notes: '' },
  { id: 'a7', classId: 'cls-001', studentId: 'std-002', date: '2023-11-02', status: ATTENDANCE_STATUS.PRESENT, notes: '' },
  { id: 'a8', classId: 'cls-001', studentId: 'std-003', date: '2023-11-02', status: ATTENDANCE_STATUS.ABSENT, notes: 'Still sick' },
  { id: 'a9', classId: 'cls-001', studentId: 'std-004', date: '2023-11-02', status: ATTENDANCE_STATUS.PRESENT, notes: '' },
  { id: 'a10', classId: 'cls-001', studentId: 'std-005', date: '2023-11-02', status: ATTENDANCE_STATUS.PRESENT, notes: '' },
  
  // Class 2, Date 2023-11-01
  { id: 'a11', classId: 'cls-002', studentId: 'std-006', date: '2023-11-01', status: ATTENDANCE_STATUS.PRESENT, notes: '' },
  { id: 'a12', classId: 'cls-002', studentId: 'std-007', date: '2023-11-01', status: ATTENDANCE_STATUS.EXCUSED, notes: 'Doctor appointment' },
  { id: 'a13', classId: 'cls-002', studentId: 'std-008', date: '2023-11-01', status: ATTENDANCE_STATUS.PRESENT, notes: '' },
  { id: 'a14', classId: 'cls-002', studentId: 'std-009', date: '2023-11-01', status: ATTENDANCE_STATUS.PRESENT, notes: '' }
];

/**
 * Get attendance records for a specific class and date
 * 
 * @param {string} classId - Class ID
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Promise<Object>} Attendance records
 */
export const getAttendanceByClassAndDate = async (classId, date) => {
  try {
    if (!classId) {
      return mockError('Class ID is required');
    }
    
    if (!date) {
      return mockError('Date is required');
    }
    
    // Filter records for the specified class and date
    const records = mockAttendanceRecords.filter(
      record => record.classId === classId && record.date === date
    );
    
    return mockSuccess(records);
  } catch (error) {
    return mockError('Failed to fetch attendance records');
  }
};

/**
 * Get attendance records for a specific student over a period
 * 
 * @param {string} studentId - Student ID
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @returns {Promise<Object>} Attendance records
 */
export const getAttendanceByStudent = async (studentId, startDate, endDate) => {
  try {
    if (!studentId) {
      return mockError('Student ID is required');
    }
    
    // Filter records for the specified student and date range
    let records = mockAttendanceRecords.filter(
      record => record.studentId === studentId
    );
    
    if (startDate) {
      records = records.filter(record => record.date >= startDate);
    }
    
    if (endDate) {
      records = records.filter(record => record.date <= endDate);
    }
    
    return mockSuccess(records);
  } catch (error) {
    return mockError('Failed to fetch student attendance records');
  }
};

/**
 * Save multiple attendance records for a class on a specific date
 * 
 * @param {string} classId - Class ID
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {Array<Object>} attendanceData - Array of attendance objects with studentId and status
 * @returns {Promise<Object>} Saved attendance records
 */
export const saveClassAttendance = async (classId, date, attendanceData) => {
  try {
    if (!classId) {
      return mockError('Class ID is required');
    }
    
    if (!date) {
      return mockError('Date is required');
    }
    
    if (!attendanceData || !Array.isArray(attendanceData) || attendanceData.length === 0) {
      return mockError('Attendance data is required');
    }
    
    // In a real implementation, this would save the data to the backend
    // For mock, we'll simulate creating/updating attendance records
    
    // Create new attendance records from the data
    const updatedRecords = attendanceData.map((item, index) => ({
      id: `attendance-${Date.now()}-${index}`, // Generate fake IDs
      classId,
      date,
      studentId: item.studentId,
      status: item.status,
      notes: item.notes || ''
    }));
    
    return mockSuccess(updatedRecords);
  } catch (error) {
    return mockError('Failed to save attendance records');
  }
};

/**
 * Generate attendance report for a class over a period
 * 
 * @param {string} classId - Class ID
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @returns {Promise<Object>} Attendance report
 */
export const generateClassAttendanceReport = async (classId, startDate, endDate) => {
  try {
    if (!classId) {
      return mockError('Class ID is required');
    }
    
    if (!startDate || !endDate) {
      return mockError('Date range is required');
    }
    
    // Filter records for the specified class and date range
    const records = mockAttendanceRecords.filter(
      record => record.classId === classId && record.date >= startDate && record.date <= endDate
    );
    
    // Group records by student
    const studentRecords = {};
    records.forEach(record => {
      if (!studentRecords[record.studentId]) {
        studentRecords[record.studentId] = [];
      }
      studentRecords[record.studentId].push(record);
    });
    
    // Calculate attendance statistics for each student
    const studentStats = Object.keys(studentRecords).map(studentId => {
      const studentData = studentRecords[studentId];
      const totalDays = studentData.length;
      const presentDays = studentData.filter(r => r.status === ATTENDANCE_STATUS.PRESENT).length;
      const absentDays = studentData.filter(r => r.status === ATTENDANCE_STATUS.ABSENT).length;
      const lateDays = studentData.filter(r => r.status === ATTENDANCE_STATUS.LATE).length;
      const excusedDays = studentData.filter(r => r.status === ATTENDANCE_STATUS.EXCUSED).length;
      
      return {
        studentId,
        totalDays,
        presentDays,
        absentDays,
        lateDays,
        excusedDays,
        attendanceRate: totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0
      };
    });
    
    // Calculate overall class statistics
    const totalRecords = records.length;
    const presentRecords = records.filter(r => r.status === ATTENDANCE_STATUS.PRESENT).length;
    const absentRecords = records.filter(r => r.status === ATTENDANCE_STATUS.ABSENT).length;
    const lateRecords = records.filter(r => r.status === ATTENDANCE_STATUS.LATE).length;
    const excusedRecords = records.filter(r => r.status === ATTENDANCE_STATUS.EXCUSED).length;
    
    const classStats = {
      totalRecords,
      presentRecords,
      absentRecords,
      lateRecords,
      excusedRecords,
      overallAttendanceRate: totalRecords > 0 ? Math.round((presentRecords / totalRecords) * 100) : 0
    };
    
    return mockSuccess({
      classId,
      startDate,
      endDate,
      studentStats,
      classStats
    });
  } catch (error) {
    return mockError('Failed to generate attendance report');
  }
};

/**
 * Get attendance trends over time for a class
 * 
 * @param {string} classId - Class ID
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @returns {Promise<Object>} Attendance trend data
 */
export const getAttendanceTrends = async (classId, startDate, endDate) => {
  try {
    if (!classId) {
      return mockError('Class ID is required');
    }
    
    if (!startDate || !endDate) {
      return mockError('Date range is required');
    }
    
    // Filter records for the specified class and date range
    const records = mockAttendanceRecords.filter(
      record => record.classId === classId && record.date >= startDate && record.date <= endDate
    );
    
    // Group records by date
    const dateGroups = {};
    records.forEach(record => {
      if (!dateGroups[record.date]) {
        dateGroups[record.date] = [];
      }
      dateGroups[record.date].push(record);
    });
    
    // Calculate attendance rates by date
    const trendData = Object.keys(dateGroups).map(date => {
      const dayRecords = dateGroups[date];
      const totalStudents = dayRecords.length;
      const presentStudents = dayRecords.filter(r => r.status === ATTENDANCE_STATUS.PRESENT).length;
      const absentStudents = dayRecords.filter(r => r.status === ATTENDANCE_STATUS.ABSENT).length;
      const lateStudents = dayRecords.filter(r => r.status === ATTENDANCE_STATUS.LATE).length;
      const excusedStudents = dayRecords.filter(r => r.status === ATTENDANCE_STATUS.EXCUSED).length;
      
      return {
        date,
        totalStudents,
        presentStudents,
        absentStudents,
        lateStudents,
        excusedStudents,
        attendanceRate: totalStudents > 0 ? Math.round((presentStudents / totalStudents) * 100) : 0
      };
    });
    
    // Sort by date
    trendData.sort((a, b) => a.date.localeCompare(b.date));
    
    return mockSuccess(trendData);
  } catch (error) {
    return mockError('Failed to fetch attendance trends');
  }
};

// Export the attendance service
export default {
  getAttendanceByClassAndDate,
  getAttendanceByStudent,
  saveClassAttendance,
  generateClassAttendanceReport,
  getAttendanceTrends,
  ATTENDANCE_STATUS
}; 
import { useState, useEffect, useCallback } from 'react';
import attendanceService, { ATTENDANCE_STATUS } from '../services/domains/attendance';

/**
 * Custom hook for managing attendance data
 * 
 * @param {string} classId - Class ID
 * @param {string} date - Date string in YYYY-MM-DD format
 * @returns {Object} Attendance hook methods and state
 */
export function useAttendance(classId, date) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Fetch attendance records for the selected class and date
  const fetchAttendance = useCallback(async () => {
    if (!classId || !date) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await attendanceService.getAttendanceByClassAndDate(classId, date);
      
      if (response.status === 200) {
        setAttendanceRecords(response.data);
        
        // Convert the array to a map for easier access
        const recordMap = {};
        response.data.forEach(record => {
          recordMap[record.studentId] = record;
        });
        
        setAttendanceMap(recordMap);
      } else {
        setError(response.message || 'Failed to fetch attendance records');
      }
    } catch (err) {
      console.error('Error fetching attendance:', err);
      setError('An error occurred while fetching attendance records');
    } finally {
      setLoading(false);
    }
  }, [classId, date]);
  
  // Initialize attendance records for all students
  const initializeAttendance = useCallback((students) => {
    if (!students || !Array.isArray(students)) return;
    
    const initialMap = {};
    
    students.forEach(student => {
      // Use existing record if available, otherwise initialize to PRESENT
      initialMap[student.id] = attendanceMap[student.id] || {
        studentId: student.id,
        status: ATTENDANCE_STATUS.PRESENT,
        notes: ''
      };
    });
    
    setAttendanceMap(initialMap);
  }, [attendanceMap]);
  
  // Update a single student's attendance status
  const updateAttendanceStatus = useCallback((studentId, status) => {
    if (!studentId) return;
    
    setAttendanceMap(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        studentId,
        status
      }
    }));
    
    // Reset success message if user makes changes after saving
    if (saveSuccess) {
      setSaveSuccess(false);
    }
  }, [saveSuccess]);
  
  // Update a single student's attendance notes
  const updateAttendanceNotes = useCallback((studentId, notes) => {
    if (!studentId) return;
    
    setAttendanceMap(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        studentId,
        notes
      }
    }));
    
    // Reset success message if user makes changes after saving
    if (saveSuccess) {
      setSaveSuccess(false);
    }
  }, [saveSuccess]);
  
  // Update all students' attendance status at once
  const markAllStatus = useCallback((status) => {
    if (!status) return;
    
    setAttendanceMap(prev => {
      const newMap = { ...prev };
      
      Object.keys(newMap).forEach(studentId => {
        newMap[studentId] = {
          ...newMap[studentId],
          status
        };
      });
      
      return newMap;
    });
    
    // Reset success message if user makes changes after saving
    if (saveSuccess) {
      setSaveSuccess(false);
    }
  }, [saveSuccess]);
  
  // Save attendance records to the server
  const saveAttendance = useCallback(async () => {
    if (!classId || !date) {
      setSaveError('Class ID and date are required');
      return;
    }
    
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);
    
    try {
      // Convert the attendance map to an array
      const attendanceArray = Object.values(attendanceMap);
      
      // Call the API to save attendance
      const response = await attendanceService.saveClassAttendance(
        classId,
        date,
        attendanceArray
      );
      
      if (response.status === 200) {
        setSaveSuccess(true);
        
        // Update our local state with the saved records
        setAttendanceRecords(response.data);
        
        // Update the map as well
        const updatedMap = {};
        response.data.forEach(record => {
          updatedMap[record.studentId] = record;
        });
        
        setAttendanceMap(updatedMap);
      } else {
        setSaveError(response.message || 'Failed to save attendance');
      }
    } catch (err) {
      console.error('Error saving attendance:', err);
      setSaveError('An error occurred while saving attendance');
    } finally {
      setSaving(false);
    }
  }, [classId, date, attendanceMap]);
  
  // Calculate attendance statistics
  const getAttendanceStats = useCallback(() => {
    const statuses = Object.values(attendanceMap).map(record => record.status);
    
    const total = statuses.length;
    const present = statuses.filter(status => status === ATTENDANCE_STATUS.PRESENT).length;
    const absent = statuses.filter(status => status === ATTENDANCE_STATUS.ABSENT).length;
    const late = statuses.filter(status => status === ATTENDANCE_STATUS.LATE).length;
    const excused = statuses.filter(status => status === ATTENDANCE_STATUS.EXCUSED).length;
    
    const presentPercentage = total ? Math.round((present / total) * 100) : 0;
    
    return {
      total,
      present,
      absent,
      late,
      excused,
      presentPercentage
    };
  }, [attendanceMap]);
  
  // Fetch attendance when classId or date changes
  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);
  
  return {
    loading,
    error,
    attendanceRecords,
    attendanceMap,
    saving,
    saveError,
    saveSuccess,
    fetchAttendance,
    initializeAttendance,
    updateAttendanceStatus,
    updateAttendanceNotes,
    markAllStatus,
    saveAttendance,
    getAttendanceStats
  };
}

export default useAttendance; 
/**
 * Teacher Schedule Service
 * 
 * Provides functions for accessing and managing teacher schedules
 * and automatically loading the current day's classes
 */

import { mockSuccess, mockError } from '../helpers';

// Mock teacher schedule data - in a real app, this would come from the backend
const mockTeacherSchedule = [
  {
    id: 'cls-001',
    name: 'Algebra I',
    section: 'A',
    grade: '9th Grade',
    room: 'Room 202',
    startTime: '08:30',
    endTime: '09:30',
    days: [1, 3, 5], // Monday, Wednesday, Friday
  },
  {
    id: 'cls-002',
    name: 'Physics Fundamentals',
    section: 'B',
    grade: '11th Grade',
    room: 'Room 105',
    startTime: '10:00',
    endTime: '11:00',
    days: [1, 3, 5], // Monday, Wednesday, Friday
  },
  {
    id: 'cls-003',
    name: 'Computer Science',
    section: 'C',
    grade: '10th Grade',
    room: 'Computer Lab',
    startTime: '13:00',
    endTime: '14:30',
    days: [2, 4], // Tuesday, Thursday
  },
  {
    id: 'cls-004',
    name: 'Geometry',
    section: 'A',
    grade: '10th Grade',
    room: 'Room 203',
    startTime: '09:45',
    endTime: '11:15',
    days: [2, 4], // Tuesday, Thursday
  },
  {
    id: 'cls-005',
    name: 'Advanced Algebra',
    section: 'B',
    grade: '12th Grade',
    room: 'Room 204',
    startTime: '14:45',
    endTime: '16:15',
    days: [1, 3, 5], // Monday, Wednesday, Friday
  }
];

/**
 * Get teacher's schedule for a specific day
 * 
 * @param {string} teacherId - Teacher ID
 * @param {Date} date - Date object
 * @returns {Promise<Object>} Teacher's schedule for the specified day
 */
export const getTeacherDailySchedule = async (teacherId, date = new Date()) => {
  try {
    if (!teacherId) {
      return mockError('Teacher ID is required');
    }
    
    // Get the day of the week (0-6, where 0 is Sunday)
    const dayOfWeek = date.getDay();
    // Convert to 1-7 where 1 is Monday and 7 is Sunday (to match our days array)
    const adjustedDay = dayOfWeek === 0 ? 7 : dayOfWeek;
    
    // Filter the schedule for the specified day
    const dailySchedule = mockTeacherSchedule.filter(cls => 
      cls.days.includes(adjustedDay)
    );
    
    // Sort by start time
    dailySchedule.sort((a, b) => {
      return a.startTime.localeCompare(b.startTime);
    });
    
    return mockSuccess({
      teacherId,
      date: date.toISOString().split('T')[0],
      schedule: dailySchedule
    });
  } catch (error) {
    return mockError('Failed to fetch teacher schedule');
  }
};

/**
 * Get current class based on the time of day
 * 
 * @param {string} teacherId - Teacher ID
 * @returns {Promise<Object>} Current class or next class
 */
export const getCurrentClass = async (teacherId) => {
  try {
    if (!teacherId) {
      return mockError('Teacher ID is required');
    }
    
    const now = new Date();
    const { data } = await getTeacherDailySchedule(teacherId, now);
    
    if (!data || !data.schedule || data.schedule.length === 0) {
      return mockSuccess({ currentClass: null, nextClass: null });
    }
    
    // Get current time in HH:MM format
    const currentTime = now.toTimeString().substring(0, 5);
    
    // Find current class (if time is between start and end)
    const currentClass = data.schedule.find(cls => 
      cls.startTime <= currentTime && cls.endTime >= currentTime
    );
    
    // Find next class (first class that starts after current time)
    const nextClass = data.schedule.find(cls => 
      cls.startTime > currentTime
    );
    
    return mockSuccess({
      currentClass: currentClass || null,
      nextClass: nextClass || null,
      allClasses: data.schedule
    });
  } catch (error) {
    return mockError('Failed to determine current class');
  }
};

export default {
  getTeacherDailySchedule,
  getCurrentClass
}; 
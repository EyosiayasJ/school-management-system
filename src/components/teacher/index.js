/**
 * Teacher Components Barrel File
 * 
 * This file exports all teacher-related components to enable cleaner imports
 * throughout the application using destructuring.
 * 
 * Example usage:
 * import { AddTeacherModal, EditTeacherModal, TeacherProfile } from '@/components/teacher';
 */

export { default as ScheduleCalendar } from './ScheduleCalendar';
export { default as AddTeacherModal } from './AddTeacherModal';
export { default as EditTeacherModal } from './EditTeacherModal';
export { default as TeacherProfile } from './TeacherProfile';

// Re-export tabs
export * from './tabs';
/**
 * Domain Services Barrel File
 * 
 * This file exports all domain-specific service modules to enable cleaner imports
 * throughout the application using destructuring.
 * 
 * Example usage:
 * import { authService, studentService, teacherService } from '@/services/domains';
 */

export * as authService from './auth';
export * as studentService from './student';
export * as teacherService from './teacher';
export * as eventService from './event';
export * as healthService from './health';
export * as libraryService from './library';
export * as termApi from './term';
export * as gradeApi from './grade';
export * as behaviorApi from './behavior';
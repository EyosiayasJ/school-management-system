/**
 * Services Barrel File
 * 
 * This file exports all service modules to enable cleaner imports
 * throughout the application using destructuring.
 * 
 * Example usage:
 * import { authService, studentService, teacherService } from '@/services';
 */

// Core services
export * as apiService from './api';
export * as helpers from './helpers';

// Domain-specific services
export * as authService from './domains/auth';
export * as studentService from './domains/student';
export * as teacherService from './domains/teacher';
export * as eventService from './domains/event';
export * as healthService from './domains/health';
export * as libraryService from './domains/library';
export * as messageService from './messagesApi';
export * as dashboardService from './dashboardservice';
export * as superAdminService from './superAdminApi';

// Re-export any other services here
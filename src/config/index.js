/**
 * Configuration Index
 * 
 * This file exports all configuration values from a central location.
 * Import from this file instead of individual config files for consistency.
 */

import apiConfig from './api.config';
import assetsConfig from './assets.config';

// Application-wide configuration
export const APP_CONFIG = {
  // App metadata
  APP_NAME: 'School Management System',
  APP_VERSION: '1.0.0',
  
  // Feature flags
  FEATURES: {
    DARK_MODE_ENABLED: false,
    NOTIFICATIONS_ENABLED: true,
    AUDIT_LOGGING_ENABLED: true,
    ADVANCED_SEARCH_ENABLED: true,
    FILE_UPLOAD_ENABLED: true
  },
  
  // System limits
  LIMITS: {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_STUDENTS_PER_PAGE: 25,
    MAX_TEACHERS_PER_PAGE: 25,
    MAX_UPLOAD_FILES: 10
  }
};

// Re-export all config modules
export * from './api.config';
export * from './assets.config';

// Export a combined default object
export default {
  ...apiConfig,
  ...assetsConfig,
  APP_CONFIG
};
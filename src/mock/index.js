/**
 * Mock Database Index
 * 
 * This module re-exports all mock data from the centralized db.js file.
 * All components should import from this index file rather than directly from db.js.
 * 
 * @module mock
 */

// Import and re-export all named exports from db.js
export * from './db';
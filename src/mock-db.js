/**
 * Mock Database for Development
 * 
 * This module provides mock data for various entities in the school management system
 * to facilitate development and testing without requiring a backend connection.
 * 
 * The data is structured to mimic the real database schemas and includes realistic
 * sample data for health records, branches, record types, and other entities
 * needed throughout the application.
 * 
 * @module mock-db
 */

// Mock data for the School Management System

// Health Records
export const healthRecords = [
  { 
    id: 1, 
    studentName: 'John Smith', 
    recordType: 'Vaccination', 
    date: '2023-05-15', 
    status: 'complete', 
    branch: 'Main Campus', 
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  { 
    id: 2, 
    studentName: 'Sarah Johnson', 
    recordType: 'Annual Checkup', 
    date: '2023-06-22', 
    status: 'pending', 
    branch: 'North Branch', 
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  { 
    id: 3, 
    studentName: 'Michael Brown', 
    recordType: 'Allergy Test', 
    date: '2023-04-10', 
    status: 'complete', 
    branch: 'Main Campus', 
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  { 
    id: 4, 
    studentName: 'Emily Davis', 
    recordType: 'Vision Test', 
    date: '2023-07-05', 
    status: 'pending', 
    branch: 'East Branch', 
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  { 
    id: 5, 
    studentName: 'David Wilson', 
    recordType: 'Dental Checkup', 
    date: '2023-03-18', 
    status: 'complete', 
    branch: 'South Branch', 
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  { 
    id: 6, 
    studentName: 'Jessica Martinez', 
    recordType: 'Hearing Test', 
    date: '2023-08-01', 
    status: 'pending', 
    branch: 'West Branch', 
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

// Branch List
export const branchesList = [
  'Main Campus',
  'North Branch',
  'South Branch',
  'East Branch',
  'West Branch'
];

// Record Types
export const recordTypes = [
  'Vaccination',
  'Annual Checkup',
  'Allergy Test',
  'Vision Test',
  'Dental Checkup',
  'Hearing Test',
  'Physical Examination',
  'Blood Test',
  'Mental Health Assessment'
];
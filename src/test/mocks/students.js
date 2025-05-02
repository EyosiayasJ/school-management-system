/**
 * Student Test Mocks
 * 
 * This file provides mock student data for testing purposes.
 * Use these mocks instead of creating new test data in individual tests.
 */

export const mockStudentData = [
  {
    id: 'student-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    grade: '10',
    section: 'A',
    admissionNumber: 'ADM-2023-001',
    gender: 'male',
    dateOfBirth: '2008-05-15',
    address: '123 School Lane, Education City',
    phoneNumber: '555-123-4567',
    parentName: 'Jane Doe',
    parentEmail: 'jane.doe@example.com',
    parentPhone: '555-765-4321',
    emergencyContact: '555-999-8888',
    bloodGroup: 'O+',
    medicalConditions: 'None',
    status: 'active',
    enrollmentDate: '2023-09-01',
    branch: 'main-campus',
    profilePicture: 'https://i.pravatar.cc/150?u=student-1'
  },
  {
    id: 'student-2',
    firstName: 'Sarah',
    lastName: 'Smith',
    email: 'sarah.smith@example.com',
    grade: '9',
    section: 'B',
    admissionNumber: 'ADM-2023-045',
    gender: 'female',
    dateOfBirth: '2009-08-23',
    address: '456 Learning Road, Knowledge Town',
    phoneNumber: '555-222-3333',
    parentName: 'Michael Smith',
    parentEmail: 'michael.smith@example.com',
    parentPhone: '555-444-5555',
    emergencyContact: '555-777-6666',
    bloodGroup: 'A-',
    medicalConditions: 'Asthma',
    status: 'active',
    enrollmentDate: '2023-09-01',
    branch: 'west-campus',
    profilePicture: 'https://i.pravatar.cc/150?u=student-2'
  }
];

export const mockStudentResponse = {
  data: mockStudentData,
  pagination: {
    total: 2,
    currentPage: 1,
    totalPages: 1,
    perPage: 10
  }
};

export const mockEmptyStudentResponse = {
  data: [],
  pagination: {
    total: 0,
    currentPage: 1,
    totalPages: 0,
    perPage: 10
  }
}; 
/**
 * Student Service Tests
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockStudentData, mockStudentResponse } from '../../../test/mocks/students';
import * as studentService from '../student';

// Mock the API module
vi.mock('../../api', () => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}));

// Import the mocked API module
import * as api from '../../api';

describe('Student Service', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  describe('getStudents', () => {
    it('fetches students with default parameters', async () => {
      // Setup the mock to return successful response
      api.get.mockResolvedValueOnce(mockStudentResponse);

      // Call the service
      const result = await studentService.getStudents();

      // Check API was called correctly
      expect(api.get).toHaveBeenCalledWith('/students', { 
        params: expect.objectContaining({ 
          page: 1, 
          limit: 10 
        }) 
      });

      // Check the response is processed correctly
      expect(result).toEqual(mockStudentResponse);
    });

    it('handles API errors gracefully', async () => {
      // Setup the mock to throw an error
      const error = new Error('Network error');
      api.get.mockRejectedValueOnce(error);

      // Call the service and expect it to handle the error
      await expect(studentService.getStudents()).rejects.toThrow('Network error');
    });
  });

  describe('getStudentById', () => {
    it('fetches a single student by ID', async () => {
      const studentId = 'student-1';
      const mockStudent = mockStudentData[0];

      // Setup the mock to return a single student
      api.get.mockResolvedValueOnce({ data: mockStudent });

      // Call the service
      const result = await studentService.getStudentById(studentId);

      // Check API was called correctly
      expect(api.get).toHaveBeenCalledWith(`/students/${studentId}`);

      // Check the response is processed correctly
      expect(result).toEqual(mockStudent);
    });
  });

  describe('createStudent', () => {
    it('sends correct data when creating a student', async () => {
      const newStudent = {
        firstName: 'New',
        lastName: 'Student',
        email: 'new.student@example.com',
      };

      // Setup the mock to return the created student with an ID
      api.post.mockResolvedValueOnce({ 
        data: { 
          id: 'new-student-id',
          ...newStudent 
        } 
      });

      // Call the service
      const result = await studentService.createStudent(newStudent);

      // Check API was called correctly
      expect(api.post).toHaveBeenCalledWith('/students', newStudent);

      // Check the response contains the new ID
      expect(result).toHaveProperty('id', 'new-student-id');
      expect(result).toHaveProperty('firstName', 'New');
    });
  });
}); 
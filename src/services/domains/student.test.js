import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as studentService from './student';
import axios from 'axios';

// Mock axios
vi.mock('axios');

describe('Student Service', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restore mocks after each test
    vi.restoreAllMocks();
  });

  describe('getStudents', () => {
    it('fetches students successfully', async () => {
      // Setup mock response
      const mockStudents = [
        { id: 1, name: 'John Smith', grade: '10th' },
        { id: 2, name: 'Sarah Johnson', grade: '8th' }
      ];

      axios.get.mockResolvedValueOnce({ data: mockStudents });

      // Call service method
      const result = await studentService.getStudents();

      // Check if axios was called correctly
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockStudents);
    });

    it('handles errors when fetching students fails', async () => {
      // Setup mock error
      const errorMessage = 'Network Error';
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      // Call service method and expect it to throw
      await expect(studentService.getStudents()).rejects.toThrow();
    });
  });

  describe('getStudentById', () => {
    it('fetches a student by ID successfully', async () => {
      // Setup mock response
      const mockStudent = { id: 1, name: 'John Smith', grade: '10th' };
      axios.get.mockResolvedValueOnce({ data: mockStudent });

      // Call service method
      const result = await studentService.getStudentById(1);

      // Check if axios was called correctly
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockStudent);
    });
  });

  describe('createStudent', () => {
    it('creates a student successfully', async () => {
      // Setup test data and mock response
      const newStudent = { name: 'Jane Doe', grade: '9th' };
      const createdStudent = { id: 3, ...newStudent };
      
      axios.post.mockResolvedValueOnce({ data: createdStudent });

      // Call service method
      const result = await studentService.createStudent(newStudent);

      // Check if axios was called correctly
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(result).toEqual(createdStudent);
    });
  });

  describe('updateStudent', () => {
    it('updates a student successfully', async () => {
      // Setup test data and mock response
      const updatedStudent = { id: 1, name: 'John Smith Jr.', grade: '11th' };
      
      axios.put.mockResolvedValueOnce({ data: updatedStudent });

      // Call service method
      const result = await studentService.updateStudent(1, updatedStudent);

      // Check if axios was called correctly
      expect(axios.put).toHaveBeenCalledTimes(1);
      expect(result).toEqual(updatedStudent);
    });
  });

  describe('deleteStudent', () => {
    it('deletes a student successfully', async () => {
      // Setup mock response
      axios.delete.mockResolvedValueOnce({ data: { success: true } });

      // Call service method
      const result = await studentService.deleteStudent(1);

      // Check if axios was called correctly
      expect(axios.delete).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ success: true });
    });
  });
}); 
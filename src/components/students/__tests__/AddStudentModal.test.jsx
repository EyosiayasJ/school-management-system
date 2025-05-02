import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AddStudentModal from '../AddStudentModal';
import { mockFramerMotion } from '../../../test/utils';

// Mock framer-motion animations
mockFramerMotion();

describe('AddStudentModal', () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();
  const mockBranchesList = ['Main Campus', 'North Campus', 'South Campus'];
  
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    branchesList: mockBranchesList
  };
  
  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnSubmit.mockClear();
  });
  
  it('should not render when isOpen is false', () => {
    render(<AddStudentModal {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByText('Add New Student')).not.toBeInTheDocument();
  });
  
  it('should render the form when isOpen is true', () => {
    render(<AddStudentModal {...defaultProps} />);
    
    expect(screen.getByText('Add New Student')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Grade')).toBeInTheDocument();
    expect(screen.getByLabelText('Branch')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
  
  it('should close the modal when clicking the close button', () => {
    render(<AddStudentModal {...defaultProps} />);
    
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  
  it('should update form data when inputs change', () => {
    render(<AddStudentModal {...defaultProps} />);
    
    const firstNameInput = screen.getByLabelText('First Name');
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput.value).toBe('John');
    
    const lastNameInput = screen.getByLabelText('Last Name');
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    expect(lastNameInput.value).toBe('Doe');
    
    const gradeInput = screen.getByLabelText('Grade');
    fireEvent.change(gradeInput, { target: { value: '10' } });
    expect(gradeInput.value).toBe('10');
  });
  
  it('should show confirmation view when form is submitted', async () => {
    render(<AddStudentModal {...defaultProps} />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Grade'), { target: { value: '10' } });
    
    // Submit the form
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    
    // Confirmation view should be shown
    await waitFor(() => {
      expect(screen.getByText('Confirm New Student')).toBeInTheDocument();
      expect(screen.getByText(/John/)).toBeInTheDocument();
      expect(screen.getByText(/Doe/)).toBeInTheDocument();
      expect(screen.getByText(/10/)).toBeInTheDocument();
    });
  });
  
  it('should call onSubmit with correct data when confirmed', async () => {
    render(<AddStudentModal {...defaultProps} />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Grade'), { target: { value: '10' } });
    
    // Submit the form
    fireEvent.click(screen.getByText('Submit'));
    
    // Wait for confirmation view
    await waitFor(() => {
      expect(screen.getByText('Confirm New Student')).toBeInTheDocument();
    });
    
    // Confirm the submission
    fireEvent.click(screen.getByText('Confirm'));
    
    // Check if onSubmit was called with the right data
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: expect.stringContaining('John') && expect.stringContaining('Doe'),
        grade: '10',
        status: 'active',
      })
    );
    
    // Modal should be closed
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  
  it('should return to edit view when clicking cancel in confirmation view', async () => {
    render(<AddStudentModal {...defaultProps} />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    
    // Submit the form
    fireEvent.click(screen.getByText('Submit'));
    
    // Wait for confirmation view
    await waitFor(() => {
      expect(screen.getByText('Confirm New Student')).toBeInTheDocument();
    });
    
    // Click cancel button
    fireEvent.click(screen.getByText('Cancel'));
    
    // Should be back to form view
    await waitFor(() => {
      expect(screen.getByText('Submit')).toBeInTheDocument();
      expect(screen.queryByText('Confirm New Student')).not.toBeInTheDocument();
    });
  });
}); 
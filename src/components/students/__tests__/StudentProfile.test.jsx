/**
 * StudentProfile Component Tests
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test/utils';
import { StudentProfile } from '../';
import { mockStudentData } from '../../../test/mocks/students';

describe('StudentProfile Component', () => {
  const mockStudent = {
    ...mockStudentData[0],
    name: `${mockStudentData[0].firstName} ${mockStudentData[0].lastName}`,
    grade: '10',
    branch: 'main-campus'
  };
  
  const mockProps = {
    student: mockStudent,
    isOpen: true,
    onClose: vi.fn(),
    onUpdateStudent: vi.fn()
  };

  it('renders without crashing', () => {
    renderWithProviders(<StudentProfile {...mockProps} />);
    
    // Basic assertions to verify the component renders correctly
    expect(screen.getByText(mockStudent.name)).toBeInTheDocument();
    expect(screen.getByText('10 Grade')).toBeInTheDocument();
    expect(screen.getByText('main-campus')).toBeInTheDocument();
  });

  it('shows student status correctly', () => {
    renderWithProviders(<StudentProfile {...mockProps} />);
    expect(screen.getByText(mockStudent.status, { exact: false })).toBeInTheDocument();
  });

  it('displays correct tabs', () => {
    renderWithProviders(<StudentProfile {...mockProps} />);
    expect(screen.getByText('Information')).toBeInTheDocument();
    expect(screen.getByText('Disciplinary Actions')).toBeInTheDocument();
  });

  it('allows switching between tabs', async () => {
    const { user } = renderWithProviders(<StudentProfile {...mockProps} />);
    
    // First tab should be active by default
    let infoTab = screen.getByText('Information');
    expect(infoTab).toHaveClass('border-blue-500');
    
    // Click on disciplinary tab
    const disciplinaryTab = screen.getByText('Disciplinary Actions');
    await user.click(disciplinaryTab);
    
    // Now disciplinary tab should be active
    expect(disciplinaryTab).toHaveClass('border-blue-500');
    expect(screen.getByText('Disciplinary Record')).toBeInTheDocument();
  });
}); 
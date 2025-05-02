import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ViewHealthRecordModal from './ViewHealthRecordModal';

describe('ViewHealthRecordModal Component', () => {
  const mockHealthRecord = {
    id: 1,
    studentName: 'John Smith',
    studentId: 123,
    type: 'vaccination',
    date: '2023-05-15',
    notes: 'Flu vaccine administered',
    status: 'complete',
    branch: 'Main Campus',
    recordedBy: 'Nurse Jane',
    attachments: []
  };

  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    record: mockHealthRecord,
    onEdit: vi.fn()
  };

  it('renders without crashing', () => {
    render(<ViewHealthRecordModal {...defaultProps} />);
    expect(screen.getByText(/John Smith/i)).toBeInTheDocument();
  });

  it('displays health record details', () => {
    render(<ViewHealthRecordModal {...defaultProps} />);
    expect(screen.getByText(/vaccination/i)).toBeInTheDocument();
    expect(screen.getByText(/Flu vaccine administered/i)).toBeInTheDocument();
    expect(screen.getByText(/complete/i)).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<ViewHealthRecordModal {...defaultProps} />);
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });
}); 
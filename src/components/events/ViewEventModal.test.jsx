import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ViewEventModal from './ViewEventModal';

describe('ViewEventModal Component', () => {
  const mockEvent = {
    id: 1,
    title: 'Test Event',
    start: new Date('2023-06-15T10:00:00'),
    end: new Date('2023-06-15T12:00:00'),
    description: 'This is a test event',
    location: 'Main Campus',
    branch: 'Main Campus',
    type: 'meeting',
    createdBy: 'Test User'
  };

  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    event: mockEvent,
    onEdit: vi.fn(),
    onDelete: vi.fn()
  };

  it('renders without crashing', () => {
    render(<ViewEventModal {...defaultProps} />);
    expect(screen.getByText(/Test Event/i)).toBeInTheDocument();
  });

  it('displays event details', () => {
    render(<ViewEventModal {...defaultProps} />);
    expect(screen.getByText(/Main Campus/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a test event/i)).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<ViewEventModal {...defaultProps} />);
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });
}); 
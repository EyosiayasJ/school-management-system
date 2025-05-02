/**
 * AddEventModal Component Tests
 */
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test/utils';
import { setupFramerMotionMock } from '../../../test/mocks/framer-motion';
import { AddEventModal } from '../';

// Setup framer-motion mock before tests
setupFramerMotionMock();

describe('AddEventModal Component', () => {
  const mockProps = {
    isOpen: true,
    onClose: vi.fn(),
    onAddEvent: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders when open', () => {
    renderWithProviders(<AddEventModal {...mockProps} />);
    
    // Very basic test just to check if component renders
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });

  it('is not visible when isOpen is false', () => {
    renderWithProviders(<AddEventModal {...mockProps} isOpen={false} />);
    
    // Should not render the modal when isOpen is false
    expect(screen.queryByTestId('motion-div')).not.toBeInTheDocument();
  });
}); 
/**
 * ToggleSwitch Component Tests
 */
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ToggleSwitch from '../ToggleSwitch';

describe('ToggleSwitch Component', () => {
  it('renders with label', () => {
    render(
      <ToggleSwitch 
        id="test-toggle"
        label="Enable Feature" 
        checked={false}
        onChange={() => {}}
      />
    );
    
    expect(screen.getByText('Enable Feature')).toBeInTheDocument();
    const toggle = screen.getByRole('checkbox');
    expect(toggle).not.toBeChecked();
  });

  it('calls onChange when clicked', () => {
    const handleChange = vi.fn();
    render(
      <ToggleSwitch 
        id="test-toggle"
        label="Enable Feature" 
        checked={false}
        onChange={handleChange}
      />
    );
    
    const toggle = screen.getByRole('checkbox');
    fireEvent.click(toggle);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
}); 
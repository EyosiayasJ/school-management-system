import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// A simple component for testing purposes
const BasicButton = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

describe('BasicButton', () => {
  it('renders with the provided label', () => {
    render(<BasicButton label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
}); 
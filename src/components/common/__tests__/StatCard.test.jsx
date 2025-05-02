/**
 * StatCard Component Tests
 */
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatCard from '../StatCard';

describe('StatCard Component', () => {
  it('renders with title, value and icon', () => {
    render(
      <StatCard 
        title="Total Users" 
        value="1,234" 
        icon={<span data-testid="mock-icon">📊</span>}
      />
    );
    
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });
}); 
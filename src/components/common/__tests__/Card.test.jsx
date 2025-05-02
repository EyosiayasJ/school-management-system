/**
 * Card Component Tests
 */
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card Component', () => {
  it('renders with title and children', () => {
    render(
      <Card title="Test Card">
        <p>Card content</p>
      </Card>
    );
    
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });
}); 
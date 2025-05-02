/**
 * FormField Component Tests
 */
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormField from '../FormField';

describe('FormField Component', () => {
  it('renders without crashing', () => {
    render(
      <FormField 
        label="Test Label" 
        name="test" 
        type="text" 
        placeholder="Enter test value" 
      />
    );
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter test value')).toBeInTheDocument();
  });

  it('renders with required attribute', () => {
    render(
      <FormField 
        label="Required Field" 
        name="test" 
        type="text" 
        required 
      />
    );
    
    // Get the input using the ID attribute that should include "field-"
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('required');
  });
  
  it('renders a select field with options', () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' }
    ];
    
    render(
      <FormField 
        label="Select Field" 
        name="select" 
        type="select"
        options={options}
      />
    );
    
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });
}); 
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormField from './FormField';

describe('FormField Component', () => {
  it('renders a text input correctly', () => {
    render(
      <FormField
        label="Username"
        name="username"
        value="testuser"
        onChange={() => {}}
      />
    );
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
  });
  
  it('calls onChange when input value changes', () => {
    const handleChange = vi.fn();
    
    render(
      <FormField
        label="Email"
        name="email"
        value=""
        onChange={handleChange}
      />
    );
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
  
  it('displays an error message when provided', () => {
    render(
      <FormField
        label="Password"
        name="password"
        type="password"
        value=""
        onChange={() => {}}
        error="Password is required"
      />
    );
    
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });
  
  it('renders a select dropdown with options', () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];
    
    render(
      <FormField
        label="Select Option"
        name="select"
        type="select"
        value="option1"
        onChange={() => {}}
        options={options}
      />
    );
    
    expect(screen.getByLabelText(/select option/i)).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });
}); 
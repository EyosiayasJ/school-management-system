import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DataTable from '../DataTable';

describe('DataTable', () => {
  // Sample test data
  const columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'email', header: 'Email' },
  ];
  
  const mockData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ];
  
  it('renders the table with the correct columns', () => {
    render(<DataTable columns={columns} data={mockData} />);
    
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });
  
  it('renders the data correctly', () => {
    render(<DataTable columns={columns} data={mockData} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });
  
  it('shows loading state when loading prop is true', () => {
    render(<DataTable columns={columns} data={[]} loading={true} loadingRowCount={3} />);
    
    // The SkeletonTableRow component should be rendered
    // We can check that none of our actual data is showing
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('jane@example.com')).not.toBeInTheDocument();
  });
  
  it('shows empty message when data is empty', () => {
    const emptyMessage = 'No users found';
    render(<DataTable columns={columns} data={[]} emptyMessage={emptyMessage} />);
    
    expect(screen.getByText(emptyMessage)).toBeInTheDocument();
  });
  
  it('shows error message when there is an error', () => {
    const errorMessage = 'Failed to load data';
    const onRetry = vi.fn();
    
    render(
      <DataTable 
        columns={columns} 
        data={[]} 
        error={errorMessage}
        onRetry={onRetry}
      />
    );
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    
    // Test retry button
    const retryButton = screen.getByText('Retry');
    fireEvent.click(retryButton);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
  
  it('calls onRowClick when a row is clicked', () => {
    const onRowClick = vi.fn();
    render(<DataTable columns={columns} data={mockData} onRowClick={onRowClick} />);
    
    // Click on the first row
    fireEvent.click(screen.getByText('John Doe'));
    
    expect(onRowClick).toHaveBeenCalledTimes(1);
    expect(onRowClick).toHaveBeenCalledWith(mockData[0]);
  });
}); 
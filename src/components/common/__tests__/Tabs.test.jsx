import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Tabs from '../Tabs';

describe('Tabs', () => {
  const tabsData = [
    {
      label: 'Tab 1',
      content: <div>Content for Tab 1</div>
    },
    {
      label: 'Tab 2',
      content: <div>Content for Tab 2</div>
    },
    {
      label: 'Tab 3',
      content: <div>Content for Tab 3</div>,
      badge: '5'
    }
  ];
  
  it('should render tabs correctly', () => {
    render(<Tabs tabs={tabsData} />);
    
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument(); // Badge
  });
  
  it('should show the first tab content by default', () => {
    render(<Tabs tabs={tabsData} />);
    
    expect(screen.getByText('Content for Tab 1')).toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 3')).not.toBeInTheDocument();
  });
  
  it('should allow changing tabs', () => {
    render(<Tabs tabs={tabsData} />);
    
    // Initially should show tab 1 content
    expect(screen.getByText('Content for Tab 1')).toBeInTheDocument();
    
    // Click on tab 2
    fireEvent.click(screen.getByText('Tab 2'));
    
    // Should now show tab 2 content
    expect(screen.queryByText('Content for Tab 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 3')).not.toBeInTheDocument();
  });
  
  it('should call onChange when tab is changed', () => {
    const onChangeMock = vi.fn();
    render(<Tabs tabs={tabsData} onChange={onChangeMock} />);
    
    // Click on tab 2
    fireEvent.click(screen.getByText('Tab 2'));
    
    expect(onChangeMock).toHaveBeenCalledWith(1);
  });
  
  it('should respect defaultActiveTab prop', () => {
    render(<Tabs tabs={tabsData} defaultActiveTab={1} />);
    
    // Should show tab 2 content by default
    expect(screen.queryByText('Content for Tab 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 3')).not.toBeInTheDocument();
  });
}); 
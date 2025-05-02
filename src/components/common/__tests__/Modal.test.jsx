import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Modal from '../Modal';

describe('Modal', () => {
  const onCloseMock = vi.fn();
  
  it('should not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={onCloseMock} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );
    
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });
  
  it('should render when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );
    
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });
  
  it('should call onClose when close button is clicked', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );
    
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
  
  it('should render footer when provided', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={onCloseMock} 
        title="Test Modal"
        footer={<button>Save</button>}
      >
        <div>Modal content</div>
      </Modal>
    );
    
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
}); 
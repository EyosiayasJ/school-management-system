import { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Modal component - A reusable modal dialog with backdrop
 * Can be used for forms, confirmations, alerts, etc.
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  closeOnBackdropClick = true,
  closeOnEscape = true,
}) => {
  // Close on escape key press
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (closeOnEscape && isOpen && e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    
    // Disable body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, closeOnEscape]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  // Determine width based on size prop
  const sizeClasses = {
    small: 'max-w-sm',
    medium: 'max-w-md',
    large: 'max-w-lg',
    xlarge: 'max-w-xl',
    '2xlarge': 'max-w-2xl',
    '3xlarge': 'max-w-3xl',
    '4xlarge': 'max-w-4xl',
    '5xlarge': 'max-w-5xl',
    '6xlarge': 'max-w-6xl',
    '7xlarge': 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} relative`}>
        {/* Modal Header */}
        {title && (
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        
        {/* Modal Body */}
        <div className="px-6 py-4">
          {children}
        </div>
        
        {/* Modal Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node,
  size: PropTypes.oneOf([
    'small', 
    'medium', 
    'large', 
    'xlarge', 
    '2xlarge', 
    '3xlarge', 
    '4xlarge', 
    '5xlarge', 
    '6xlarge', 
    '7xlarge', 
    'full'
  ]),
  closeOnBackdropClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
};

export default Modal; 
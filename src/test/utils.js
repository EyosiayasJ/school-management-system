/**
 * Test Utilities
 * 
 * This file provides common testing utilities to make tests more consistent
 * and reduce boilerplate code in individual test files.
 */

import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { AuthProvider } from '../contexts/AuthContext';
import QueryProvider from '../providers/QueryProvider';

/**
 * Renders a component wrapped with all necessary providers
 * for integration testing.
 * 
 * @param {JSX.Element} ui - The React component to render
 * @param {Object} options - Additional options to pass to render
 * @returns {Object} The testing-library render result with added user event
 */
export function renderWithProviders(ui, options = {}) {
  const user = userEvent.setup();
  
  const Wrapper = ({ children }) => (
    <QueryProvider>
      <AuthProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </AuthProvider>
    </QueryProvider>
  );

  const result = render(ui, { wrapper: Wrapper, ...options });
  
  // Return the user event instance along with the render result
  return {
    ...result,
    user,
  };
}

/**
 * Mock implementation for framer-motion
 * Helps avoid animation-related issues in tests
 */
export const mockFramerMotion = () => {
  vi.mock('framer-motion', () => {
    const actual = vi.importActual('framer-motion');
    return {
      ...actual,
      motion: {
        div: ({ children, ...props }) => <div {...props}>{children}</div>,
        aside: ({ children, ...props }) => <aside {...props}>{children}</aside>,
        span: ({ children, ...props }) => <span {...props}>{children}</span>,
        button: ({ children, ...props }) => <button {...props}>{children}</button>,
        ul: ({ children, ...props }) => <ul {...props}>{children}</ul>,
        li: ({ children, ...props }) => <li {...props}>{children}</li>,
        // Add more HTML elements as needed
      },
      AnimatePresence: ({ children }) => <>{children}</>,
    };
  });
};

/**
 * Creates a mock function with a specific resolved return value
 * 
 * @param {any} returnValue - The value to resolve with
 * @returns {Function} A mock function that resolves with the provided value
 */
export function createResolvedMock(returnValue) {
  return vi.fn().mockResolvedValue(returnValue);
}

/**
 * Creates a mock function that rejects with an error
 * 
 * @param {Error|string} error - The error to reject with
 * @returns {Function} A mock function that rejects with the provided error
 */
export function createRejectedMock(error) {
  return vi.fn().mockRejectedValue(error);
}

/**
 * Wait for a specified amount of time
 * 
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after the specified time
 */
export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); 
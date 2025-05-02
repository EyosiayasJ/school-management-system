/**
 * Global Test Setup
 * 
 * This file sets up the testing environment for all tests.
 * It's automatically loaded by Vitest/Jest during test initialization.
 */

import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock ResizeObserver which isn't available in test environment
window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock Intersection Observer
window.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock fetch
window.fetch = vi.fn().mockImplementation(() => 
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
    status: 200,
    text: () => Promise.resolve(''),
  })
);

// Clean up after each test
afterEach(() => {
  cleanup();
  
  // Reset any mocks
  vi.clearAllMocks();
});

// Suppress console errors/warnings during tests
// Uncomment if console is too noisy during tests
// const originalConsoleError = console.error;
// const originalConsoleWarn = console.warn;
// console.error = (...args) => {
//   if (
//     /Warning: ReactDOM.render is no longer supported/i.test(args[0]) ||
//     /Warning: You have a test renderer/i.test(args[0]) ||
//     /Warning: An update to/i.test(args[0])
//   ) {
//     return;
//   }
//   originalConsoleError(...args);
// };
// console.warn = (...args) => {
//   if (/Warning: useLayoutEffect/i.test(args[0])) {
//     return;
//   }
//   originalConsoleWarn(...args);
// };

// Mock for react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useParams: () => ({}),
    useLocation: () => ({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    }),
  };
});

// Mock for the authentication context
vi.mock('../contexts/AuthContext', async () => {
  const actual = await vi.importActual('../contexts/AuthContext');
  return {
    ...actual,
    useAuth: () => ({
      user: { id: 1, name: 'Test User', role: 'TEACHER' },
      login: vi.fn(),
      logout: vi.fn(),
      isAuthenticated: true,
    }),
    ROLES: {
      SUPER_ADMIN: 'SUPER_ADMIN',
      SUPPORT_ADMIN: 'SUPPORT_ADMIN',
      TEACHER: 'TEACHER',
      STUDENT: 'STUDENT',
      PARENT: 'PARENT',
      BRANCH_DIRECTOR: 'BRANCH_DIRECTOR',
      HQ_DIRECTOR: 'HQ_DIRECTOR',
    },
  };
}); 
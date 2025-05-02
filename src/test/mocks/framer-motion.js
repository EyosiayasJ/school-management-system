/**
 * Mock Implementation for framer-motion
 * 
 * This module provides a consistent mock for framer-motion
 * to simplify testing components that use animations.
 */

import React from 'react';
import { vi } from 'vitest';

/**
 * Creates HTML elements with the same props but without animations
 */
const createMockComponent = (type) => ({ children, ...props }) => 
  React.createElement(type, { 
    'data-testid': `motion-${type}`,
    ...props 
  }, children);

// Main mock object for framer-motion
const framerMotionMock = {
  // Mock basic HTML elements with motion prefix
  motion: {
    div: createMockComponent('div'),
    form: createMockComponent('form'),
    button: createMockComponent('button'),
    span: createMockComponent('span'),
    p: createMockComponent('p'),
    a: createMockComponent('a'),
    ul: createMockComponent('ul'),
    li: createMockComponent('li'),
    header: createMockComponent('header'),
    footer: createMockComponent('footer'),
    main: createMockComponent('main'),
    section: createMockComponent('section'),
    article: createMockComponent('article'),
    nav: createMockComponent('nav'),
    aside: createMockComponent('aside'),
    h1: createMockComponent('h1'),
    h2: createMockComponent('h2'),
    h3: createMockComponent('h3'),
    h4: createMockComponent('h4'),
    h5: createMockComponent('h5'),
    h6: createMockComponent('h6'),
    input: createMockComponent('input'),
    textarea: createMockComponent('textarea'),
    select: createMockComponent('select'),
    option: createMockComponent('option'),
    label: createMockComponent('label'),
    img: createMockComponent('img'),
    // Add more as needed
  },
  
  // Animation utilities
  AnimatePresence: ({ children }) => 
    React.createElement('div', { 'data-testid': 'animate-presence' }, children),
  
  // Animation hooks (mocked to be no-op)
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
    set: vi.fn(),
  }),
  
  // Animation variants
  useMotionValue: (initialValue) => ({
    get: () => initialValue,
    set: vi.fn(),
    onChange: vi.fn(),
  }),
  
  useTransform: () => ({
    get: vi.fn(),
    set: vi.fn(),
  }),
  
  // Animation values
  animate: vi.fn(),
  variants: vi.fn(),
};

/**
 * Setup framer-motion mock for tests
 */
export const setupFramerMotionMock = () => {
  vi.mock('framer-motion', () => framerMotionMock);
};

export default framerMotionMock; 
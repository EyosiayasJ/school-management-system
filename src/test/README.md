# Testing Utilities

This directory contains shared test utilities, mocks, and configuration for the School Management System.

## 📁 Files

- `setup.js`: Global test setup for Vitest/Jest, including DOM testing library configuration

## 🧪 Testing Strategy

Our testing approach follows these principles:

1. **Component Tests**: Each UI component should have at least a basic render test
2. **Service Tests**: API and domain services should have comprehensive unit tests
3. **Integration Tests**: Key user flows should have integration tests

## 📝 Test Structure

Tests should be organized in one of two ways:

1. **Co-located with implementation**:
   - `ComponentName.test.jsx` next to `ComponentName.jsx`
   - `service.test.js` next to `service.js`

2. **Grouped in `__tests__` directory**:
   - For complex components or services with multiple test files
   - Example: `components/students/__tests__/AddStudentModal.test.jsx`

## 🛠️ Utilities

Use the shared test utilities in this directory:

```js
// Import test utilities
import { renderWithProviders } from '@/test/utils';
import { mockStudentData } from '@/test/mocks/students';

// Example test
test('renders student component', () => {
  const { getByText } = renderWithProviders(<StudentComponent data={mockStudentData} />);
  expect(getByText('Student Profile')).toBeInTheDocument();
});
```

## 📊 Coverage Goals

- Components: 80% coverage
- Services: 90% coverage
- Utilities: 95% coverage 
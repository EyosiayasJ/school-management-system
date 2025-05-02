# Testing Documentation

## Overview

This document provides information about the testing strategy, tools, and practices used in the School Management System frontend project.

## Testing Structure

The project uses a comprehensive testing approach with the following structure:

- **Unit Tests**: Test individual components and functions in isolation
- **Integration Tests**: Test interactions between components and services
- **Smoke Tests**: Verify that basic functionality renders without errors
- **Interaction Tests**: Test critical user flows and interactions

Tests are organized within the codebase as follows:

```
src/
  ├── components/
  │   ├── common/
  │   │   ├── __tests__/          # Common component tests
  │   │   │   ├── Card.test.jsx
  │   │   │   ├── DataTable.test.jsx
  │   │   │   ├── Modal.test.jsx
  │   │   │   └── ...
  │   ├── students/
  │   │   ├── __tests__/          # Student component tests
  │   │   │   ├── AddStudentModal.test.jsx
  │   │   │   ├── StudentProfile.test.jsx
  │   │   │   └── ...
  ├── services/
  │   ├── domains/
  │   │   ├── __tests__/          # Domain service tests
  │   │   │   ├── student.test.js
  │   │   │   └── ...
  ├── test/                       # Testing utilities and setup
  │   ├── mocks/                  # Mock data and implementations
  │   │   ├── framer-motion.js     
  │   │   ├── students.js
  │   │   └── ...
  │   ├── setup.js                # Global test setup
  │   └── utils.js                # Testing utility functions
```

## Testing Tools and Utilities

The project uses the following testing tools:

- **Vitest**: Fast testing framework compatible with Vite
- **React Testing Library**: Testing UI components with a user-centric approach
- **@testing-library/user-event**: Simulate user interactions
- **jsdom**: DOM environment for tests
- **Testing Utilities**:
  - `renderWithProviders`: Renders components with all necessary context providers
  - `mockFramerMotion`: Mocks framer-motion animations
  - `createResolvedMock`: Creates mocks that resolve with a specified value
  - `createRejectedMock`: Creates mocks that reject with a specified error

## Test Types and Best Practices

### Smoke Tests

Smoke tests verify that components render without crashing. These are the simplest form of tests and should be implemented for all components.

**Example:**
```jsx
it('renders without crashing', () => {
  render(<Card title="Test Card">Content</Card>);
  expect(screen.getByText('Test Card')).toBeInTheDocument();
});
```

### Interaction Tests

Interaction tests verify that components respond correctly to user interactions such as clicks, input changes, and form submissions.

**Example:**
```jsx
it('updates form data when inputs change', async () => {
  const { user } = renderWithProviders(<AddStudentModal {...props} />);
  
  await user.type(screen.getByLabelText('First Name'), 'John');
  expect(screen.getByLabelText('First Name')).toHaveValue('John');
});
```

### Service Tests

Service tests verify that API services correctly interact with the backend and process responses.

**Example:**
```jsx
it('fetches students with default parameters', async () => {
  api.get.mockResolvedValueOnce(mockStudentResponse);
  const result = await studentService.getStudents();
  expect(api.get).toHaveBeenCalledWith('/students', { 
    params: expect.objectContaining({ page: 1, limit: 10 }) 
  });
});
```

## Running Tests

The project includes the following test scripts:

- `npm run test`: Run tests in watch mode (default)
- `npm run test:run`: Run tests once
- `npm run test:ci`: Run tests with coverage in CI mode
- `npm run test:ui`: Run tests with the Vitest UI

## Test Coverage

We use Vitest's built-in coverage reporting to track test coverage. The coverage goals are:

- Statements: 70%
- Branches: 70%
- Functions: 70%
- Lines: 70%

To view coverage reports:

1. Run `npm run test:ci`
2. Open `coverage/index.html` in a browser

## Writing New Tests

When writing new tests, follow these guidelines:

1. **Component Tests**:
   - Create tests in `__tests__` folder next to the component
   - Test both rendering and interactions
   - Use `renderWithProviders` for components that need context

2. **Service Tests**:
   - Mock API responses
   - Test success and error cases
   - Verify correct API calls

3. **General Guidelines**:
   - Test functionality, not implementation details
   - Use descriptive test names that explain the expected behavior
   - Keep tests independent and isolated

## CI/CD Integration

Tests are automatically run in the CI/CD pipeline through GitHub Actions. The configuration is defined in `.github/workflows/test.yml`.

## Troubleshooting Common Issues

- **Tests failing with animation errors**: Use the `mockFramerMotion` utility
- **Context-related errors**: Use `renderWithProviders` instead of the standard `render`
- **Asynchronous tests**: Use `await` with user events and API calls
- **Finding elements**: Prefer queries like `getByRole` and `getByLabelText` over `getByTestId` 
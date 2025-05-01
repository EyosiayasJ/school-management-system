# Providers

This directory contains higher-order provider components that wrap the application to provide functionality across the component tree.

## 📦 Available Providers

### QueryProvider
Configures and provides React Query for data fetching:
- Global configuration for caching
- Request deduplication
- Error handling
- Loading states

```jsx
// Usage in main.jsx
import QueryProvider from './providers/QueryProvider';

ReactDOM.render(
  <QueryProvider>
    <App />
  </QueryProvider>,
  document.getElementById('root')
);
```

### ThemeProvider
Provides theme functionality:
- Light/dark mode toggle
- Theme persistence in localStorage
- System preference detection

### ErrorBoundaryProvider
Catches JavaScript errors in child components:
- Prevents UI crashes
- Displays fallback UI
- Reports errors to logging services

## 🔄 Provider Pattern

Each provider follows these principles:
1. **Single Responsibility** - Each provider handles one concern
2. **Composability** - Providers can be nested for layered functionality
3. **Configuration** - Accept props for customizing behavior
4. **Performance** - Minimize unnecessary re-renders

## 🌳 Provider Composition

Providers are composed in this order (from outer to inner):
1. `ErrorBoundaryProvider` - Catches all errors
2. `QueryProvider` - Manages API data
3. `AuthProvider` - Handles authentication
4. `ToastProvider` - Manages notifications
5. `ThemeProvider` - Handles theming

This order ensures that core functionality like error handling is always available, even if inner providers fail.

## 👨‍👩‍👧‍👦 Why are provider components like good parents?

They take care of all their children's needs without being asked! 👶 
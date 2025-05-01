# Contexts

This directory contains React Context providers used for global state management throughout the application.

## 📊 Available Contexts

### AuthContext
Manages authentication state and user information:
- Current user data
- Login/logout functionality
- Role-based access control
- Token management

```jsx
// Usage example
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { currentUser, logout } = useAuth();
  // ...
}
```

### ToastContext
Provides toast notifications system:
- Success/error/info/warning notifications
- Customizable duration and position
- Notification queuing

### ThemeContext
Manages application theming:
- Light/dark mode switching
- Theme customization
- Preferred color scheme detection

## 🔄 Context Pattern

Each context follows a standard pattern:
1. **Context Creation** - `createContext()`
2. **Provider Component** - Manages state and provides values
3. **Custom Hook** - `useContext()` wrapper for better DX and type safety
4. **Default Values** - Sensible defaults when used outside provider

## 💡 Best Practices

- Use contexts for truly global state
- Prefer component composition for most prop drilling cases
- Keep context values stable with `useMemo` and `useCallback`
- Split large contexts into smaller, more focused ones

## 🧠 Why did the React state go to therapy?

It had too many context issues to manage on its own! 🤯 
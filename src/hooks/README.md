# Hooks

This directory contains custom React hooks used throughout the application for shared logic and state management.

## 🎣 Available Hooks

### useMessages
Provides state management and functionality for messaging features:
- Thread fetching and management
- Message sending/reading
- Thread creation
- Unread count tracking

```jsx
// Usage example
import { useMessages } from '../hooks';

function MessagesComponent() {
  const { 
    threads, 
    currentThread, 
    loading, 
    fetchThreads, 
    fetchThread,
    sendMessage,
    createThread
  } = useMessages();
  
  // Use these functions and state in your component
}
```

### useMessageThread
Focused hook for working with a single message thread:
- Loads a specific thread and its messages
- Manages read/unread status
- Handles message sending within the thread

### Other Hooks

The hooks directory also contains subdirectories with role-specific hooks:
- `supportAdmin/` - Hooks for support administration features
- `superAdmin/` - Hooks for system administration features

## 🔄 Hook Pattern

Our custom hooks follow these principles:
1. **Encapsulation** - Each hook encapsulates a specific piece of functionality
2. **Composition** - Hooks can be composed together for complex features
3. **Separation of Concerns** - UI components remain clean with logic in hooks
4. **Reusability** - Hooks are designed to be reused across components

## 📚 Best Practices

When using hooks in this application:
- Import from `src/hooks` index file, not directly from individual files
- Use conditional hook calls inside useEffect, not at the component level
- Keep hook dependencies minimal to prevent excess re-renders
- Use the appropriate error handling from hooks in your UI components

## 🎣 Why are React developers such great fishermen?

They know how to hook components with just the right bait! 🐟 
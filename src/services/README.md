# Services

This directory contains service modules that handle API calls and data processing for the application.

## 🔄 Available Services

### messagesApi.js
Provides functions for interacting with the messaging API:
- `getMessageThreads()` - Fetches all message threads for the current user
- `getMessageThread(threadId)` - Fetches a specific thread with all messages
- `sendMessage(threadId, text)` - Sends a new message in an existing thread
- `createMessageThread(recipientIds, subject, initialMessage)` - Creates a new thread
- `markMessageAsRead(messageId)` - Marks a specific message as read

### api.js
Core API service with base configuration and helpers:
- Axios instance setup with auth headers
- Request/response interceptors
- Error handling
- Retry logic

### superAdminApi.js
API calls specific to super admin functionality:
- School management
- User management
- Branch management
- System configuration

### supportAdminApi.js
API calls specific to support admin functionality:
- School onboarding
- Support ticket management
- Configuration assistance

### helpers.js
Utility functions to support API services:
- Response formatting
- Error normalization
- Data transformation helpers

## 🔄 Service Pattern

Each service follows these principles:
1. **Separation of Concerns** - Each service handles one domain area
2. **Consistent Error Handling** - All services handle errors in the same way
3. **Toast Integration** - User feedback for async operations
4. **Promise-Based** - All API calls return promises for consistent handling

## 📚 Usage Example

```javascript
import { getMessageThreads, sendMessage } from '../services/messagesApi';

// Fetch message threads
const fetchMessages = async () => {
  try {
    const threads = await getMessageThreads();
    setThreads(threads);
  } catch (error) {
    // Error already handled by the service
    setThreads([]);
  }
};

// Send a message
const handleSend = async (threadId, message) => {
  try {
    const sentMessage = await sendMessage(threadId, message);
    // Handle success
    return sentMessage;
  } catch (error) {
    // Handle error (though the service will show a toast automatically)
    return null;
  }
};
```

## 🤪 Why was the C# developer always so calm?

Because they handled all their exceptions exceptionally well! 👨‍💻 
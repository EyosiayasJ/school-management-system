# Utilities

This directory contains utility functions and helper methods used throughout the application.

## 🛠️ Available Utilities

### date.js
Date formatting and manipulation utilities:
- Format dates for display
- Calculate date differences
- Handle timezone conversions
- Date validation

```javascript
import { formatDate, getRelativeTime } from '../utils/date';

// Usage
formatDate(new Date(), 'MM/DD/YYYY'); // '01/15/2023'
getRelativeTime(timestamp); // '3 days ago'
```

### formatting.js
Data formatting utilities:
- Number formatting (currency, percentages)
- Text formatting (capitalization, truncation)
- Phone number formatting
- Address formatting

### validation.js
Form validation utilities:
- Email validation
- Password strength rules
- Phone number validation
- Required field checks

### storage.js
Local storage utilities:
- Get/set/remove items with type safety
- Automatic JSON parsing/stringifying
- Storage with expiration

### http.js
HTTP request utilities:
- Request interceptors
- Response handlers
- Error formatting
- Request cancellation

## 🔄 Design Principles

All utility functions follow these principles:
1. **Pure Functions** - Same output for same input, no side effects
2. **Single Responsibility** - Each function does one thing well
3. **Immutability** - Don't modify input parameters
4. **Error Handling** - Graceful error handling and helpful messages
5. **Testing** - Easy to unit test

## 🔧 Why do programmers make good utility workers?

Because they always have the right functions for the job! 🛠️ 
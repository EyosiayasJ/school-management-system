# API Module

This directory contains the API client implementations and service definitions for external API communication.

## 📡 Available API Clients

### library.js
Implementation of the library management API endpoints:
- Book search and retrieval
- Borrowing and returning books
- Reservation management
- Library resource availability checking

## 🌐 API Implementation Pattern

Each API client follows a consistent pattern:
1. **Endpoint Definitions** - Clear URI constants
2. **Request Methods** - GET, POST, PUT, DELETE implementations
3. **Response Handling** - Standardized response parsing
4. **Error Management** - Consistent error handling
5. **Caching Strategy** - Where applicable

## 🔌 Integration with Services

The API implementations are used by the service layer (in `/src/services/`) which adds:
- Business logic
- Data transformation
- State management integration

## 🔄 Configuration

API clients retrieve configuration from:
- `src/config/api.config.js` - Contains API base URLs, timeouts, and headers

## 🚨 Error Handling

All API clients implement a standard error handling pattern:
- Network errors
- API-specific error codes
- Response validation
- Timeout handling

## 🧪 Testing

When working in development:
- API clients can be configured to use mock data
- Response simulation is available for testing error cases
- Configurable request delays simulate network conditions

## 👨‍💻 Why was the API call feeling lonely?

Because it got rejected too many times! 404 friends not found. 🌐 
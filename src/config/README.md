# Configuration

This directory contains configuration files that define application-wide settings and constants.

## 📄 Configuration Files

### api.config.js
API configuration parameters:
- `API_BASE_URL` - Base URL for API requests
- `API_TIMEOUT` - Default timeout for requests
- `ENDPOINTS` - Object mapping API endpoint names to paths
- `API_REQUEST_LIMIT` - Rate limiting parameters

### app.config.js
Application-wide settings:
- Theme configuration
- Feature flags
- Default pagination settings
- Date/time format preferences

### routes.config.js
Defines application routes:
- Route paths
- Role-based access rules
- Route metadata (for breadcrumbs, titles)
- Nested route configurations

### constants.js
Application constants:
- Status codes
- User roles and permissions
- Message types
- Notification categories

## 📝 Configuration Usage

These configuration files are imported throughout the application to maintain consistency and allow for centralized changes.

Example usage:

```javascript
import { API_BASE_URL, ENDPOINTS } from '../config/api.config';
import { ROLES, PERMISSIONS } from '../config/constants';

// Using API config
const userEndpoint = `${API_BASE_URL}${ENDPOINTS.USERS}`;

// Using roles
const isAdmin = currentUser.role === ROLES.ADMIN;
```

## 🔄 Environment-Specific Configuration

The application supports different configurations based on environment:
- Development environment
- Testing environment
- Production environment

Environment variables are used to override default configuration values:
- `VITE_API_URL` - Overrides API_BASE_URL
- `VITE_ENABLE_MOCK` - Toggles mock API responses
- `VITE_LOG_LEVEL` - Sets logging verbosity

## 🤣 Why don't programmers like nature?

It has too many cache misses! 💾 
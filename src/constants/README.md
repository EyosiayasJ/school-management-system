# Constants

This directory contains application-wide constant definitions and enumeration values.

## 🔠 Available Constants

### roles.js
Defines user role constants for the application:
- Role identifiers
- Permission levels
- Role hierarchies
- Access control constants

## 🔄 Usage Guidelines

Constants should be:
1. **Immutable** - Never modified at runtime
2. **Exported Explicitly** - Named exports for better imports
3. **Well-Commented** - Clear documentation of meaning and usage
4. **Grouped Logically** - Related constants together

## 📋 When to Use Constants

Create constants for:
- Values used in multiple places
- Magic numbers and strings
- Configuration that doesn't change frequently
- Enumerated types
- Status and state values

## 🔢 Naming Conventions

Constants follow these naming conventions:
- UPPER_SNAKE_CASE for true constants
- PascalCase for enumeration types
- Descriptive names that indicate purpose
- Prefixes for grouping related constants

## 🧩 Integration

Constants are imported directly into components and services:

```javascript
import { ROLES } from '../constants/roles';

function isTeacher(user) {
  return user.role === ROLES.TEACHER;
}
```

## 🔄 Adding New Constants

When adding new constants:
1. Group related constants in the same file
2. Export constants as named exports
3. Document the purpose and valid values
4. Consider backwards compatibility
5. Add appropriate TypeScript types

## 👨‍💻 Why did the constant feel lonely?

Because nobody ever tried to change its value! 🔒 
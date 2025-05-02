# Mock Data

This directory contains mock data and simulated backends for development and testing.

## 📊 Available Mock Implementations

### db.js
A mock database implementation that provides:
- Simulated data for the entire application
- CRUD operations with in-memory storage
- Entity relationships similar to the production database
- Latency simulation for realistic development

## 🔄 Purpose and Usage

The mock data serves several purposes:
1. **Development Without Backend** - Allows frontend development before the backend is ready
2. **Offline Development** - Enables working without network connectivity
3. **Testing** - Provides consistent test data for unit and integration tests
4. **Demonstrations** - Powers demo environments with realistic but sanitized data

## 📋 Data Structure

The mock database includes simulated data for:
- Users (teachers, students, administrators)
- Classes and courses
- Assignments and grades
- Messages and communications
- Events and scheduling
- Resources and teaching materials

## 🔄 How to Use

In development mode, the application automatically uses mock data when:
- The environment is set to development
- The backend URL is not available
- Mock mode is explicitly enabled

To use mock data:
```javascript
import { getUsers } from './db';

// Use just like a real data source
const users = getUsers();
```

## 🧪 Data Generation

Some data is dynamically generated at runtime using:
- Consistent seeds for reproducibility
- Realistic patterns for names, dates, etc.
- Configurable volume of generated entities

 Why did the mock database never get tired?
Because it always had plenty of mock energy! 
# Domain Services

This directory contains domain-specific service modules that handle the business logic and API calls for different feature areas of the application.

## 🔄 Available Domains

Each domain represents a specific feature area of the school management system:

### auth.js
Authentication services:
- User login/logout
- Token management
- Password recovery
- Session handling

### student.js
Student management services:
- Student CRUD operations
- Enrollment management
- Academic record access
- Student status changes (suspensions, warnings)

### teacher.js
Teacher management services:
- Teacher CRUD operations
- Schedule management
- Class assignments
- Performance tracking

### event.js
Event management services:
- School calendar operations
- Event scheduling and updates
- Attendance tracking
- Notification broadcasting

### health.js
Health record management:
- Medical records CRUD
- Vaccination tracking
- Allergy information
- Incident reporting

### library.js
Library resource management:
- Book and resource cataloging
- Check-out/check-in operations
- Digital resource access
- Resource availability tracking

## 🔄 Integration with API

These domain services interact with:
1. The central API service
2. Mock data during development
3. Local storage for offline capabilities

## 🔄 Usage Guidelines

When using domain services:
1. Import from the barrel file (`index.js`) rather than individual files
2. Use consistent error handling patterns
3. Implement proper loading states in components
4. Follow the service method naming conventions

## 🧩 Designing New Services

When creating a new domain service:
1. Follow the established patterns in existing services
2. Start with core CRUD operations
3. Implement filtering, sorting, and pagination consistently
4. Include proper error handling
5. Add the export to the barrel file

## 🔄 Example Usage

```javascript
import { studentService, teacherService } from '@/services/domains';

async function loadDashboardData() {
  const [students, teachers] = await Promise.all([
    studentService.getStudents({ status: 'active' }),
    teacherService.getTeachers({ branch: 'Main Campus' })
  ]);
  
  return { students, teachers };
} 
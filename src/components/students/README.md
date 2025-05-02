# Student Components

This directory contains UI components for student management in the School Management System.

## 🎓 Features

- **Student Profile**: View detailed student information
- **Add/Edit**: Create and update student records
- **Disciplinary Actions**: Handle warnings, suspensions, expulsions
- **Status Management**: Activate, deactivate, blacklist students

## 📁 Components

- `AddStudentModal.jsx`: Modal for creating new student records
- `EditStudentModal.jsx`: Modal for updating existing student data
- `StudentProfile.jsx`: Drawer for viewing complete student details
- `WarnModal.jsx`: Issue academic or behavioral warnings
- `SuspendModal.jsx`: Temporarily suspend a student
- `ExpelModal.jsx`: Permanently remove a student
- `BlacklistModal.jsx`: Block a student from future admissions
- `TerminateStudentModal.jsx`: End a student's enrollment

## 🔄 Usage

These components are primarily used in the student management pages:

```jsx
import { 
  AddStudentModal, 
  EditStudentModal, 
  StudentProfile 
} from '@/components/students';

// Example usage
<AddStudentModal 
  isOpen={showModal} 
  onClose={handleClose} 
  onSubmit={handleCreateStudent} 
/>
```

## 🧪 Testing

Each component should have tests in the `__tests__` directory covering:
- Basic rendering
- User interactions (clicks, form submissions)
- Error states
- Success states

## 🔗 Related

- Student pages: `/src/pages/students`
- Student services: `/src/services/domains/student.js`
- Mock data: `/src/mock/students.js` 
# Students Management Module

## Overview
The Students Management module provides a comprehensive interface for administrators to manage student profiles, including viewing, searching, filtering, adding, editing, and performing disciplinary actions.

## Features

### List View
- **Paginated List**: View all students with pagination support
- **Search**: Search by name, grade, or branch with debounced filtering
- **Filtering**: Filter by status (all/active/inactive/suspended/blacklisted)
- **Responsive Design**: Table view on desktop, card view on mobile

### Add/Edit Student
- **Modal Form**: Reusable form for both adding and editing students
- **Fields**: Name, Grade, Branch, Status, GPA, Avatar upload
- **Validation**: Required fields with format checks
- **Confirmation**: Preview changes before submitting

### Profile Drawer
- **Information Tab**: View complete student details
- **Academic Tab**: View academic performance and records
- **Disciplinary Tab**: Access to disciplinary actions
- **Actions**: Edit, Warn, Suspend, Blacklist, Expel

### Disciplinary Actions
- **Warning**: Issue formal warnings that are tracked
- **Suspension**: Temporarily suspend a student with end date
- **Blacklisting**: Mark a student as blacklisted
- **Expulsion**: Remove a student from the system

## Components

### Pages
- `StudentsList.jsx`: Main page component with state management

### Components
- `AddStudentModal.jsx`: Modal for adding new students
- `EditStudentModal.jsx`: Modal for editing existing students
- `StudentProfile.jsx`: Drawer for viewing details and performing actions
- `ToastProvider.jsx`: Notification system for user feedback

## State Management
All data currently lives in React state for frontend-only implementation. The architecture is designed to easily connect to a backend API in the future without significant refactoring.

## Future Enhancements
- Connect to backend API
- Add pagination server-side
- Implement more advanced filtering
- Add reporting features
- Implement user permissions
- Add grade tracking and academic performance metrics
- Implement parent/guardian contact information
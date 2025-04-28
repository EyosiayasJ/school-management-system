# Teachers Management Module

## Overview
The Teachers Management module provides a comprehensive interface for administrators to manage teacher profiles, including viewing, searching, filtering, adding, editing, and performing disciplinary actions.

## Features

### List View
- **Paginated List**: View all teachers with pagination support
- **Search**: Search by name, subject, or branch with debounced filtering
- **Filtering**: Filter by status (all/active/inactive/suspended/blacklisted)
- **Responsive Design**: Table view on desktop, card view on mobile

### Add/Edit Teacher
- **Modal Form**: Reusable form for both adding and editing teachers
- **Fields**: First/Middle/Last Name, Subject, Branch, Status, Avatar upload
- **Validation**: Required fields with format checks
- **Confirmation**: Preview changes before submitting

### Profile Drawer
- **Information Tab**: View complete teacher details
- **Disciplinary Tab**: Access to disciplinary actions
- **Actions**: Edit, Warn, Suspend, Blacklist, Expel

### Disciplinary Actions
- **Warning**: Issue formal warnings that are tracked
- **Suspension**: Temporarily suspend a teacher with end date
- **Blacklisting**: Mark a teacher as blacklisted
- **Expulsion**: Remove a teacher from the system

## Components

### Pages
- `TeachersList.jsx`: Main page component with state management

### Components
- `AddTeacherModal.jsx`: Modal for adding new teachers
- `EditTeacherModal.jsx`: Modal for editing existing teachers
- `TeacherProfile.jsx`: Drawer for viewing details and performing actions
- `ToastProvider.jsx`: Notification system for user feedback

## State Management
All data currently lives in React state for frontend-only implementation. The architecture is designed to easily connect to a backend API in the future without significant refactoring.

## Future Enhancements
- Connect to backend API
- Add pagination server-side
- Implement more advanced filtering
- Add reporting features
- Implement user permissions
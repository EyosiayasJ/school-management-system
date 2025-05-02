# Teachers Module

This directory contains all teacher-related pages for both teacher portal access and administrative teacher management.

## 👨‍🏫 Teacher Management (Admin View)

### Features

- **Paginated List**: View all teachers with pagination support
- **Search**: Search by name, subject, or branch with debounced filtering
- **Filtering**: Filter by status (all/active/inactive/suspended/blacklisted)
- **Responsive Design**: Table view on desktop, card view on mobile

### Pages
- `TeachersList.jsx`: Main page component for teacher management

### Components (in `/components/teacher/`)
- `AddTeacherModal.jsx`: Modal for adding new teachers
- `EditTeacherModal.jsx`: Modal for editing existing teachers
- `TeacherProfile.jsx`: Drawer for viewing details and performing actions

## 📚 Teacher Portal Pages

### Dashboard.jsx
The main landing page for teachers:
- Class schedule overview
- Recent notifications
- Upcoming assignments and deadlines
- Student performance metrics
- Quick action buttons

### Classes.jsx
Lists all classes assigned to the teacher:
- Class cards with summary information
- Quick access to class details
- Filter and search functionality
- Class status indicators

### ClassDetail.jsx
Detailed view of a specific class:
- Tab-based interface for different aspects of class management
- Student roster, assignments, grades, attendance, and resources tabs
- Class summary information
- Quick actions specific to the class

### Attendance.jsx
Comprehensive attendance management:
- Daily, weekly, and monthly attendance tracking
- Individual and bulk attendance marking
- Absence tracking and reporting
- Attendance statistics and trends
- Export capabilities

### Assignments.jsx
Assignment creation and management:
- Create new assignments with rich text editor
- Assignment status tracking
- Submission management
- Grading interface
- Assignment analytics

### Grades.jsx
Complete grade management system:
- Grade entry and editing
- Grade calculation tools
- Performance analytics
- Grading scale management
- Report generation

### Resources.jsx
Teaching materials management:
- Upload and organize teaching resources
- File categorization and tagging
- Resource sharing options
- Student access management
- External resource integration

### Messages.jsx
Communication system for teachers:
- Threaded conversations with students, parents, and staff
- Message composition with formatting
- File attachments
- Read receipts
- Notification management

### Profile.jsx
Teacher profile management:
- Personal information management
- Professional qualifications
- Schedule preferences
- Account settings
- Password management

## 🔄 Page Structure

Each page follows a consistent structure:
1. **Header** - Page title and action buttons
2. **Main Content** - Primary data display or form interface
3. **Loading States** - Skeleton loaders for asynchronous content
4. **Error Handling** - User-friendly error displays with recovery options
5. **Responsive Design** - Optimized for desktop, tablet, and mobile devices

## 🧩 Component Composition

Pages are composed of smaller, reusable components from:
- `src/components/teacher/` - Teacher-specific components
- `src/components/common/` - Shared UI components
- `src/components/layout/` - Layout structural components

## 🔄 Data Flow

All data currently lives in React state with mock data for frontend-only implementation. The architecture is designed to easily connect to a backend API in the future without significant refactoring.

## 🎭 Mock Data

For development purposes, these components use mock data from `/src/mock/`. In a production environment, they would connect to actual API endpoints.

## 📱 Responsive Design

All pages are designed to work on various screen sizes, from mobile to desktop.

## 🔮 Future Enhancements
- Connect to backend API
- Add pagination server-side
- Implement more advanced filtering
- Add reporting features
- Implement user permissions
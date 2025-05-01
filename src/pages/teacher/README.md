# Teacher Portal Pages

This directory contains page components for the Teacher Portal section of the school management system.

## 📚 Available Pages

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

## 📱 Why did the teacher wear sunglasses to school?

Because their students were too bright! 🌞

## 🔄 Data Flow

Each page typically follows this data flow pattern:
1. Fetch data using API services or mock data
2. Display loading states while data is being fetched
3. Handle and display any errors that occur
4. Present the data in an organized, user-friendly interface
5. Provide actions to interact with the data
6. Submit changes back to the API when needed

## 🎭 Mock Data

For development purposes, these components use mock data. In a production environment, they would connect to actual API endpoints.

## 📱 Responsive Design

All pages are designed to work on various screen sizes, from mobile to desktop.

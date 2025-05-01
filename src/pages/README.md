# Pages

This directory contains all the page components that correspond to routes in the application.

## 📂 Directory Structure

### auth/
Authentication and authorization related pages:
- `AdminLogin.jsx` - Login for administrative users
- `ExternalLogin.jsx` - Login for students and parents
- `InternalLogin.jsx` - Login for teachers and staff
- `ForgotPassword.jsx` - Password recovery flow
- `Unauthorized.jsx` - Access denied page

### dashboard/
Dashboard views for different user roles:
- `Dashboard.jsx` - Main dashboard with metrics and summaries

### teacher/
Pages for the Teacher Portal:
- `Dashboard.jsx` - Teacher-specific dashboard
- `Classes.jsx` - List of teacher's classes
- `ClassDetail.jsx` - Detailed view of a specific class
- `Attendance.jsx` - Attendance management
- `Assignments.jsx` - Assignment creation and grading
- `Grades.jsx` - Grade management
- `Resources.jsx` - Teaching materials library
- `Messages.jsx` - Communication system
- `Profile.jsx` - Teacher profile management

### super-admin/
Pages for system administrators:
- `Dashboard.jsx` - Admin dashboard
- `Schools.jsx` - School management
- `SchoolDetail.jsx` - School details and configuration
- `Users.jsx` - User management
- `Branches.jsx` - Branch management
- `GlobalSettings.jsx` - System-wide settings

### support-admin/
Pages for support administrators:
- `Dashboard.jsx` - Support dashboard
- `OnboardSchool.jsx` - School onboarding flow
- `SchoolSettings.jsx` - School configuration
- `SchoolBranches.jsx` - Branch management for schools

## 🔄 Page Structure

Each page typically follows this structure:
1. **Header** - Title and action buttons using `ActionBar`
2. **Content** - Main content area with data display or forms
3. **Loading States** - Skeleton loaders or spinners during data fetching
4. **Error States** - User-friendly error messages
5. **Empty States** - Appropriate UI for no data conditions

## 🧭 Why don't web navigators get lost?

Because they always follow the right routes! 🗺️ 
# Components

This directory contains all reusable UI components used throughout the application.

## 📦 Directory Structure

### common/
Generic UI components shared across the entire application:
- `ActionBar.jsx` - Page header with title and actions
- `DataTable.jsx` - Reusable table with sorting and filtering
- `FormField.jsx` - Input field wrapper with validation
- `Modal.jsx` - Popup dialog component
- `Pagination.jsx` - Navigation for paginated content

### layout/
Layout components that define the page structure:
- `TeacherLayout.jsx` - Layout for teacher portal
- `SchoolLayout.jsx` - Layout for school staff
- `PortalLayout.jsx` - Layout for students and parents
- `SuperAdminLayout.jsx` - Layout for system administrators

### teacher/
Components specific to the Teacher Portal:
- `ScheduleCalendar.jsx` - Calendar view for teacher's schedule
- Tabs for class details - Roster, Assignments, Grades, etc.

### super-admin/
Components for the Super Admin dashboard:
- `SchoolModal.jsx` - For creating and editing schools
- `UserModal.jsx` - For managing system users

## 🔄 Component Design Principles

All components follow these design principles:
1. **Single Responsibility** - Each component does one thing well
2. **Composability** - Components can be combined to build complex UIs
3. **Reusability** - Components are parameterized via props
4. **Consistency** - Shared styling and behavior patterns
5. **Accessibility** - ARIA attributes and keyboard navigation

## 💅 Styling Approach

Components use Tailwind CSS for styling with consistent patterns:
- Scale with responsive breakpoints (mobile-first)
- Use design system color tokens
- Maintain consistent spacing and typography

## 🧐 Why are React components so busy on weekends?

Because they're always rendering! 🖥️ 
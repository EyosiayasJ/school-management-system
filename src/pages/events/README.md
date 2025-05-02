# Events Pages

This directory contains pages related to event management and calendaring in the school management system.

## 📅 Available Pages

### EventsCalendar.jsx
The main calendar view for events:
- Interactive calendar with day, week, and month views
- Event creation, editing, and deletion
- Color-coded events by category
- Filtering and search capabilities
- Event details modal

### CustomToolbar.jsx
A custom toolbar component for the calendar:
- Navigation controls (previous, next, today)
- View selection (day, week, month)
- Date range display
- Export and print functionality

## 🔄 Features

The events module provides:
- Visual calendar interface for school events
- Event management for administrators and teachers
- Automated notifications for upcoming events
- Recurring event creation
- Event categorization and color coding
- Attendance tracking for events

## 🔔 Integration

The events pages integrate with:
- User permissions system to control event creation/editing rights
- Notification system to alert about upcoming events
- Student and teacher records for attendance tracking
- Branch management to filter events by location

## 📋 Usage Guidelines

When developing event-related features:
- Follow the established patterns for event data handling
- Use the CustomToolbar for consistent calendar navigation
- Implement proper validation for event dates and times
- Ensure responsive design for all calendar views
- Maintain visual consistency with the rest of the application

## 🧪 Testing 

When testing event features:
- Verify date handling and timezone consistency
- Test event creation, editing, and deletion flows
- Validate event display in different calendar views
- Check event filtering and search functionality
- Test event notifications and reminders 
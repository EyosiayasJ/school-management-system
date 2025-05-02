# Events Components

This directory contains reusable UI components related to event management and calendaring in the school management system.

## 📅 Available Components

### AddEventModal.jsx
Modal dialog for creating new events:
- Form with validation for event details
- Date and time selection with date picker
- Event category and color selection
- Recurring event options
- Branch and location assignment

### EditEventModal.jsx
Modal dialog for modifying existing events:
- Pre-populated form with current event details
- Advanced editing options
- History tracking of changes
- Access control based on user permissions
- Option to update single or recurring events

### ViewEventModal.jsx
Modal dialog for viewing event details:
- Comprehensive display of event information
- Attendee list and management
- Related resources and attachments
- Action buttons for editing and deletion
- Share and export functionality

### EventDayBg.jsx
Custom calendar day background component:
- Visual styling for calendar days
- Highlighting for current day
- Special styling for holidays and important dates
- Background customization by event type
- Responsive design for different calendar views

### DeleteEventModal.jsx
Modal dialog for event deletion:
- Confirmation prompt to prevent accidental deletion
- Option to delete single or recurring events
- Reason tracking for audit purposes
- Notification options for affected users

### ConfirmDeleteModal.jsx
Generic confirmation dialog for deletion actions:
- Reusable confirmation interface
- Custom messaging based on context
- Primary and secondary action buttons
- Optional explanation field for deletion reason

## 🔄 Integration

These components integrate with:
- Calendar view components for seamless display
- Event management services and API endpoints
- User permissions system for access control
- Notification system for event alerts
- Data validation services for form inputs

## 📋 Usage Guidelines

When using event components:
- Always include appropriate validation in event forms
- Maintain consistent design language across modals
- Implement proper confirmation flows for destructive actions
- Ensure responsive behavior for all device sizes
- Use consistent date and time formatting

## 🧪 Testing Considerations

When testing event components:
- Verify form validation behavior
- Test date and time selection across timezones
- Validate modal transitions and animations
- Check accessibility compliance for all components
- Test integration with calendar views 
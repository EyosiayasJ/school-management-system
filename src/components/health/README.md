# Health Components

This directory contains reusable UI components related to student health record management in the school management system.

## 🏥 Available Components

### AddHealthRecordModal.jsx
Modal dialog for creating new health records:
- Form with validation for health record details
- Record type selection (vaccination, allergy, physical, etc.)
- Date selection with date picker
- File attachment for supporting documents
- Notes and follow-up information fields

### EditHealthRecordModal.jsx
Modal dialog for modifying existing health records:
- Pre-populated form with current record details
- History tracking of record changes
- Access control based on user role permissions
- Follow-up status updates
- Audit trail for compliance requirements

### ViewHealthRecordModal.jsx
Modal dialog for viewing health record details:
- Comprehensive display of record information
- Related records and medical history
- Document attachment preview
- Action buttons for editing and deletion
- Print and export functionality

## 🔒 Privacy & Security

These components implement:
- Role-based access control for sensitive medical data
- Audit logging for all record operations
- Secure handling of medical document attachments
- Parental consent verification
- Compliance with medical privacy regulations

## 🔄 Integration

These components integrate with:
- Student information system
- Document management services
- User permissions system for access control
- Notification system for medical alerts
- Data validation services for form inputs

## 📋 Usage Guidelines

When using health components:
- Always use appropriate validation for medical information
- Implement proper error handling and form validation
- Ensure all medical terminology is consistent
- Include clear instructions for form fields
- Use date formatting consistently for medical records
- Follow established privacy and security protocols

## 🧪 Testing Considerations

When testing health components:
- Verify form validation for required medical information
- Test document upload and attachment handling
- Validate access control based on user roles
- Check audit trail entries for record operations
- Test integration with student information system
- Verify compliance with medical privacy requirements 
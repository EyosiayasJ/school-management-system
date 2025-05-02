# Super Admin Components

This directory contains UI components specifically for the Super Admin portal of the School Management System.

## 🔑 Features

- **School Management**: Create, update, and view school details
- **Branch Management**: Manage school branches and locations
- **User Management**: Administer user accounts and permissions
- **Settings**: Configure system-wide settings

## 📁 Components

- `SchoolModal.jsx`: Modal for creating and editing schools
- `BranchModal.jsx`: Modal for creating and editing branches
- `UserModal.jsx`: Modal for managing user accounts
- `SchoolSettingsTab.jsx`: Tab view for school-specific settings
- `SchoolBranchesTab.jsx`: Tab view for managing branches under a school
- `SchoolUsersTab.jsx`: Tab view for managing users under a school

## 🔄 Usage

These components are primarily used within the Super Admin portal pages:

```jsx
import { SchoolModal, BranchModal } from '@/components/super-admin';

// Example usage
<SchoolModal 
  isOpen={showModal} 
  onClose={handleClose} 
  onSubmit={handleCreateSchool} 
/>
```

## 🔗 Related

- Super Admin pages: `/src/pages/super-admin`
- Admin services: `/src/services/domains/admin.js` 
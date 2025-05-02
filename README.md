# School Management System

A comprehensive school management system for educational institutions with a multi-role structure including Super Admin, Support Admin, Teachers, School Staff, and Student/Parent portals.

## 📋 Features

- **Role-Based Access Control**: Different interfaces and permissions for each user type
- **Super Admin Portal**: System-wide administration of schools, users, and settings
- **Support Admin Portal**: Technical support and school onboarding
- **Teacher Portal**: Classroom management, grades, attendance, and resources
- **School Staff Portal**: Branch-level administration and reporting
- **Student/Parent Portal**: Academic progress tracking and resource access

## 🧩 Project Structure

```
src/
├── assets/            # Static assets (images, icons, etc.)
├── components/        # Reusable UI components
│   ├── common/        # Shared components used across the application
│   ├── students/      # Student-specific components
│   ├── teachers/      # Teacher-specific components
│   ├── health/        # Health record components
│   ├── events/        # Calendar and event components
│   └── layout/        # Layout components for different user roles
├── config/            # Application configuration
│   └── api.config.js  # API endpoints and configuration
├── constants/         # Application constants and enumerations
├── contexts/          # React context providers
├── hooks/             # Custom React hooks
├── mock/              # Mock data for development
│   └── db.js          # Central mock database
├── pages/             # Page components organized by feature area
│   ├── auth/          # Authentication pages (login, signup, etc.)
│   ├── dashboard/     # Dashboard pages for different roles
│   ├── students/      # Student management pages
│   ├── teachers/      # Teacher management pages
│   ├── events/        # Calendar and event pages
│   ├── super-admin/   # Super admin specific pages
│   └── support-admin/ # Support admin specific pages
├── providers/         # Global providers (query, theme, etc.)
├── services/          # API services and data access
│   └── domains/       # Domain-specific service modules
└── utils/             # Utility functions and helpers
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Access the application at `http://localhost:5173`

## 🔑 Authentication

The system includes multiple login flows:
- Internal admin login (Super Admin and Support Admin)
- External login for school staff (Teachers, Directors)
- Student/Parent portal login

## 🧪 Development

### Mock Data
During development, the application uses mock data from `src/mock/db.js` to simulate backend functionality.

### Adding New Features
1. Create components in the appropriate directory
2. Add service methods in the corresponding domain service
3. Create or update page components
4. Update routes in App.jsx if needed

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests

## 🔧 Technologies

- React
- React Router
- TailwindCSS
- Vite

# School Management System - Teacher Portal

A comprehensive school management frontend application with a focus on the Teacher Portal.

## 🎓 Overview

This application provides a modern, efficient interface for educational institutions to manage their operations. The Teacher Portal is a dedicated section that allows teachers to communicate with students and parents, manage resources, track grades, take attendance, and handle their profile information.

## 🚀 Features

### Teacher Portal Features
- **Dashboard**: Overview of classes, upcoming events, and important metrics
- **Class Management**: View and manage assigned classes with detailed student information
- **Attendance Tracking**: Record and monitor student attendance with reporting tools
- **Assignment Management**: Create, distribute, and grade assignments with student submission tracking
- **Grading System**: Comprehensive grade management with performance analytics
- **Messaging System**: Communicate with students, parents, and staff through threaded conversations
- **Resources Library**: Upload and share teaching materials with organization tools
- **Profile Management**: Update personal information, credentials, and account settings
- **Notification System**: Real-time notifications for important events and messages

## 💻 Tech Stack

- **Frontend Framework**: React.js
- **Routing**: React Router for navigation
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: Context API and custom hooks
- **Data Fetching**: Axios and React Query
- **UI Components**: Custom components with Headless UI and Material UI
- **Charts and Visualization**: Recharts for data visualization
- **Notifications**: React Hot Toast for toast notifications
- **Icons**: Heroicons and React Icons
- **Date Handling**: date-fns for date manipulation
- **Animation**: Framer Motion for smooth transitions

## 🏗️ Project Structure

```
src/
├── components/            # Reusable components
│   ├── common/            # Shared UI components
│   ├── layout/            # Layout components
│   └── teacher/           # Teacher-specific components
│       └── tabs/          # Tab components for teacher pages
├── contexts/              # React Contexts
├── hooks/                 # Custom React hooks
├── pages/                 # Page components
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── teacher/           # Teacher portal pages
├── services/              # API services
│   └── messagesApi.js     # API services for messaging functionality
├── config/                # Application configuration
└── utils/                 # Utility functions
```

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/school-management-frontend.git
cd school-management-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to the local development URL (usually http://localhost:5173)

## 🔑 Login Credentials

For testing the Teacher Portal, use the following credentials:
- **Email**: teacher@school.com
- **Password**: (any password will work for testing)

Other test accounts:
- Director: director@school.com (any password)
- HQ: hq@school.com (any password)

## 📝 Documentation

Each folder contains a README.md file explaining its purpose and contents. The code is documented with clear, concise comments explaining the functionality.

Key documentation files:
- `src/components/README.md` - Overview of component organization
- `src/pages/README.md` - Page structure and routing information
- `src/services/README.md` - API service documentation
- `src/hooks/README.md` - Custom hooks documentation

## 🧪 Testing

This project includes mock data for development and testing purposes. In a real environment, the application would connect to backend APIs.

## 👨‍💻 Why did the JavaScript developer go broke?

Because he lost his cache! 💾

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

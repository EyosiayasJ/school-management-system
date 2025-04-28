import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ToastProvider from './components/common/ToastProvider';
import { useState } from 'react';

// Layout
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './pages/auth/ProtectedRoute';

// Auth Pages
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';

// Dashboard and other Pages
import Dashboard from './pages/dashboard/Dashboard';
import StudentsList from './pages/students/StudentsList';
import TeachersList from './pages/teachers/TeachersList';
import HealthRecordsList from './pages/health/HealthRecordsList';
import ELibrary from './pages/library/ELibrary';
import EventsCalendar from './pages/events/EventsCalendar';
import BranchManagement from './pages/branches/BranchManagement';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <ToastProvider />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<StudentsList />} />
          <Route path="teachers" element={<TeachersList />} />
          <Route path="health-records" element={<HealthRecordsList />} />
          <Route path="e-library" element={<ELibrary />} />
          <Route path="events" element={<EventsCalendar />} />
          <Route path="branches" element={<BranchManagement />} />
        </Route>

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

/**
 * Main Application Component
 * 
 * This is the root component of the school management system that defines
 * the application's routing structure and provider hierarchy.
 * 
 * The routing is organized by user roles with specific layouts for each role:
 * - Super Admin: System-wide administration
 * - Support Admin: Technical support and school onboarding
 * - Teachers: Classroom and student management
 * - School Staff: Branch-level administration
 * - Students/Parents: Learning portal access
 * 
 * Each route is protected by role-based access control to ensure users
 * can only access appropriate sections of the application.
 * 
 * @module App
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ToastProvider from './components/common/ToastProvider';
import QueryProvider from './providers/QueryProvider';

// Auth Provider
import { AuthProvider, ROLES } from './contexts/AuthContext';

// Layouts
import MainLayout from './components/layout/MainLayout';
import SuperAdminLayout from './components/layout/SuperAdminLayout';
import SupportAdminLayout from './components/layout/SupportAdminLayout';
import SchoolLayout from './components/layout/SchoolLayout';
import PortalLayout from './components/layout/PortalLayout';
import TeacherLayout from './components/layout/TeacherLayout';
import RoleBasedRoute from './components/common/RoleBasedRoute';

// Auth Pages
import InternalLogin from './pages/auth/InternalLogin';
import ExternalLogin from './pages/auth/ExternalLogin';
import AdminLogin from './pages/auth/AdminLogin';
import ForgotPassword from './pages/auth/ForgotPassword';
import Unauthorized from './pages/auth/Unauthorized';

// Dashboard and other Pages
import Dashboard from './pages/dashboard/Dashboard';
import StudentsList from './pages/students/StudentsList';
import TeachersList from './pages/teachers/TeachersList';
import HealthRecordsList from './pages/health/HealthRecordsList';
import ELibrary from './pages/library/ELibrary';
import EventsCalendar from './pages/events/EventsCalendar';
import BranchManagement from './pages/branches/BranchManagement';

// Super Admin Pages
import SuperAdminDashboard from './pages/super-admin/Dashboard';
import Schools from './pages/super-admin/Schools';
import SchoolDetail from './pages/super-admin/SchoolDetail';
import Users from './pages/super-admin/Users';
import Branches from './pages/super-admin/Branches';
import GlobalSettings from './pages/super-admin/GlobalSettings';
import BillingPlans from './pages/super-admin/BillingPlans';
import AuditLogs from './pages/super-admin/AuditLogs';

// Support Admin Pages
import SupportAdminDashboard from './pages/support-admin/Dashboard';
import OnboardSchool from './pages/support-admin/OnboardSchool';
import SchoolSettings from './pages/support-admin/SchoolSettings';
import SchoolBranches from './pages/support-admin/SchoolBranches';

// Teacher Pages
import TeacherDashboard from './pages/teacher/Dashboard';
import Classes from './pages/teacher/Classes';
import ClassDetail from './pages/teacher/ClassDetail';
import Attendance from './pages/teacher/Attendance';
import Assignments from './pages/teacher/Assignments';
import Grades from './pages/teacher/Grades';
import Resources from './pages/teacher/Resources';
import Messages from './pages/teacher/Messages';
import Profile from './pages/teacher/Profile';

/**
 * App Component
 * 
 * The root component that sets up the application structure with:
 * - Global state providers (QueryProvider, AuthProvider)
 * - Router configuration with protected routes
 * - Role-specific layouts and navigation
 * 
 * @returns {JSX.Element} The complete application component tree
 */
function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <Router>
          <ToastProvider />
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Navigate to="/login/external" replace />} />
            <Route path="/login/internal" element={<InternalLogin />} />
            <Route path="/login/external" element={<ExternalLogin />} />
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Super Admin Routes */}
            <Route path="/super-admin" element={
              <RoleBasedRoute requiredRole={ROLES.SUPER_ADMIN}>
                <SuperAdminLayout />
              </RoleBasedRoute>
            }>
              <Route index element={<SuperAdminDashboard />} />
              <Route path="schools" element={<Schools />} />
              <Route path="schools/:id" element={<SchoolDetail />} />
              <Route path="branches" element={<Branches />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<GlobalSettings />} />
              <Route path="billing-plans" element={<BillingPlans />} />
              <Route path="audit" element={<AuditLogs />} />
            </Route>

            {/* Support Admin Routes */}
            <Route path="/support-admin" element={
              <RoleBasedRoute requiredRole={ROLES.SUPPORT_ADMIN}>
                <SupportAdminLayout />
              </RoleBasedRoute>
            }>
              <Route index element={<SupportAdminDashboard />} />
              <Route path="onboard" element={<OnboardSchool />} />
              <Route path="schools" element={<Schools />} />
              <Route path="schools/:id/settings" element={<SchoolSettings />} />
              <Route path="schools/:id/branches" element={<SchoolBranches />} />
              <Route path="tickets" element={<SupportAdminDashboard />} />
            </Route>
            
            {/* Teacher Routes */}
            <Route path="/teacher" element={
              <RoleBasedRoute requiredRole={ROLES.TEACHER}>
                <TeacherLayout />
              </RoleBasedRoute>
            }>
              <Route index element={<TeacherDashboard />} />
              <Route path="classes" element={<Classes />} />
              <Route path="classes/:id" element={<ClassDetail />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="attendance/:classId" element={<Attendance />} />
              <Route path="assignments" element={<Assignments />} />
              <Route path="grades" element={<Grades />} />
              <Route path="grades/:classId" element={<Grades />} />
              <Route path="resources" element={<Resources />} />
              <Route path="messages" element={<Messages />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            
            {/* School Staff Routes */}
            <Route path="/school" element={
              <RoleBasedRoute requiredRoles={[ROLES.TEACHER, ROLES.BRANCH_DIRECTOR, ROLES.HQ_DIRECTOR]}>
                <SchoolLayout />
              </RoleBasedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="students" element={<StudentsList />} />
              <Route path="teachers" element={<TeachersList />} />
              <Route path="health-records" element={<HealthRecordsList />} />
              <Route path="e-library" element={<ELibrary />} />
              <Route path="events" element={<EventsCalendar />} />
              <Route path="branches" element={<BranchManagement />} />
            </Route>
            
            {/* Student & Parent Routes */}
            <Route path="/portal" element={
              <RoleBasedRoute requiredRoles={[ROLES.STUDENT, ROLES.PARENT]}>
                <PortalLayout />
              </RoleBasedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="courses" element={<Navigate to="/portal" replace />} />
              <Route path="grades" element={<Navigate to="/portal" replace />} />
              <Route path="attendance" element={<Navigate to="/portal" replace />} />
              <Route path="calendar" element={<EventsCalendar />} />
              <Route path="library" element={<ELibrary />} />
            </Route>

            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;

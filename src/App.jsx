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
import { AuthProvider, ROLES } from './contexts/AuthContext';
import { TermProvider } from './contexts/TermContext';
import QueryProvider from './providers/QueryProvider';

// Common components
import { RoleBasedRoute, ToastProvider } from './components/common';

// Layouts
import MainLayout from './components/layout/MainLayout';
import SuperAdminLayout from './components/layout/SuperAdminLayout';
import SupportAdminLayout from './components/layout/SupportAdminLayout';
import SchoolLayout from './components/layout/SchoolLayout';
import PortalLayout from './components/layout/PortalLayout';
import TeacherLayout from './components/layout/TeacherLayout';

// Auth Pages
import { 
  InternalLogin, 
  ExternalLogin, 
  AdminLogin, 
  ForgotPassword, 
  Unauthorized 
} from './pages/auth';

// Dashboard and Pages
import { Dashboard } from './pages/dashboard';
import { StudentsList } from './pages/students';
import { 
  TeachersList, 
  Dashboard as TeacherDashboard,
  Classes,
  ClassDetail,
  Attendance,
  Assignments,
  Grades,
  Resources,
  Messages,
  Profile,
  HomeroomDashboard
} from './pages/teachers';
import { HealthRecordsList } from './pages/health';
import { ELibrary } from './pages/library';
import { EventsCalendar } from './pages/events';
import { BranchManagement } from './pages/branches';

// Super Admin Pages
import {
  Dashboard as SuperAdminDashboard,
  Schools,
  SchoolDetail,
  Users,
  Branches,
  GlobalSettings,
  BillingPlans,
  AuditLogs,
  TermsPage
} from './pages/super-admin';

// Support Admin Pages
import {
  Dashboard as SupportAdminDashboard,
  OnboardSchool,
  SchoolSettings,
  SchoolBranches
} from './pages/support-admin';

/**
 * App Component
 * 
 * The root component that sets up the application structure with:
 * - Global state providers (QueryProvider, AuthProvider, TermProvider)
 * - Router configuration with protected routes
 * - Role-specific layouts and navigation
 * 
 * @returns {JSX.Element} The complete application component tree
 */
function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <TermProvider>
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
                <Route path="terms" element={<TermsPage />} />
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
                <Route path="homeroom" element={<HomeroomDashboard />} />
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
        </TermProvider>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;

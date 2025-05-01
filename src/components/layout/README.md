# Layout Components

This directory contains layout components that define the structure and navigation patterns of the application.

## 🏗️ Available Layouts

### TeacherLayout.jsx
Main layout for the Teacher Portal:
- Responsive sidebar navigation
- Notifications dropdown system
- User profile menu
- Header with page title
- Content area with routing

### SuperAdminLayout.jsx
Layout for system administrators:
- Admin dashboard navigation
- System status indicators
- Advanced configuration access
- Multi-school management interface

### SupportAdminLayout.jsx
Layout for support administrators:
- School support tools
- Ticketing system access
- Onboarding workflows
- Support resources

### SchoolLayout.jsx
Layout for school management:
- School-specific navigation
- Branch management
- Staff directory access
- School settings

### PortalLayout.jsx
Layout for students and parents:
- Student/parent specific navigation
- Assignments view
- Grades access
- Communication tools

### MainLayout.jsx
Base layout used by other layouts:
- Common structure
- Authentication handling
- Theme application
- Error boundary

### Header.jsx
Common header component:
- Branding
- Search functionality
- User account access
- Help resources

### Sidebar.jsx
Reusable sidebar component:
- Dynamic navigation generation
- Collapsible sections
- Mobile responsiveness
- Role-based menu items

## 🔄 Layout Architecture

The layout components follow these design principles:
1. **Composition** - Layouts compose smaller components
2. **Consistency** - Common patterns across different user roles
3. **Responsiveness** - Adapts to all device sizes
4. **Accessibility** - Keyboard navigation and screen reader support
5. **Performance** - Efficient rendering of complex navigation structures

## 📱 Responsive Behavior

All layouts implement responsive behavior:
- Full sidebar on desktop
- Collapsible sidebar on tablet
- Bottom navigation or hamburger menu on mobile
- Appropriate touch targets for mobile devices

## 🧭 Why don't React routers ever get lost?

Because they always know all the routes to take, even when components are trying to navigate away! 🗺️ 
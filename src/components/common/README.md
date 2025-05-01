# Common Components

This directory contains reusable, shared UI components used throughout the school management system.

## 🧩 Available Components

### ActionBar.jsx
Top action bar with search, filters, and action buttons:
- Configurable actions (create, delete, etc.)
- Search functionality with debouncing
- Filter dropdowns with multi-select
- Responsive design for all screen sizes

### Card.jsx
Flexible content card container:
- Configurable padding, shadows, and borders
- Header, body, and footer sections
- Status indicators
- Hover and focus states

### DataTable.jsx
Comprehensive table component:
- Sortable columns
- Pagination controls
- Row selection
- Custom cell renderers
- Loading states
- Empty state handling

### FormField.jsx
Input field component with validation:
- Text, number, email, password inputs
- Select dropdowns and multi-select
- Checkboxes and radio buttons
- Date and time pickers
- Form validation and error display

### Modal.jsx
Dialog box for forms and confirmations:
- Configurable size (small, medium, large)
- Custom headers and footers
- Backdrop click handling
- Focus trapping for accessibility
- Animation effects

### ProtectedRoute.jsx
Route wrapper for authentication:
- Redirects unauthenticated users
- Configurable redirect paths
- Preserves intended destination
- Loading states during auth check

### RoleBasedRoute.jsx
Route wrapper for authorization:
- Controls access based on user roles
- Supports multiple required roles
- Unauthorized handling
- Compatible with nested routes

### SkeletonActionBar.jsx
Loading placeholder for action bar:
- Matches ActionBar dimensions
- Animated shimmer effect
- Maintains layout during loading

### SkeletonStatCard.jsx
Loading placeholder for stat cards:
- Animated shimmer effect
- Preserves card layout during data fetching

### SkeletonTableRow.jsx
Loading placeholder for table rows:
- Customizable number of cells
- Matches DataTable styling
- Animated loading effect

### StatCard.jsx
Analytics and statistics display card:
- Number formatting
- Change indicators (increase/decrease)
- Icon support
- Color coding by status or trend

### Tabs.jsx
Tabbed interface for content organization:
- Horizontal and vertical orientations
- Badge support for notifications
- Active tab indicators
- Responsive design

### ToastProvider.jsx
Notification system provider:
- Success, error, warning, and info toasts
- Configurable duration
- Dismissable notifications
- Stacking behavior

### ToggleSwitch.jsx
Boolean selection control:
- On/off states with custom colors
- Label positioning
- Disabled state
- Animation effects

## 🔄 Design Principles

Common components follow these principles:
1. **Consistency** - Unified styling and behavior
2. **Accessibility** - WCAG compliance with proper ARIA attributes
3. **Composability** - Components can be combined and nested
4. **Configurability** - Props for customizing appearance and behavior
5. **Performance** - Optimized rendering with memoization

## 🎨 Styling Approach

Components use a combination of:
- Tailwind CSS utility classes
- CSS modules for component-specific styles
- CSS variables for theming

## 📱 Responsive Design

All components are designed to work across:
- Desktop monitors
- Laptops
- Tablets
- Mobile phones

## 🧪 Component Testing

Components include tests for:
- Rendering correctness
- State management
- Event handling
- Accessibility compliance

## 🤔 Why did the component go to therapy?

It had too many props to handle! 🎭 
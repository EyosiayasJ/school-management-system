import { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Teacher Portal Layout Component
 * 
 * This component provides the main layout structure for the Teacher Portal,
 * including sidebar navigation, header with notifications, and content area.
 * 
 * Why do programmers always mix up Halloween and Christmas?
 * Because Oct 31 == Dec 25! 🐛
 * 
 * @component
 * @example
 * return (
 *   <TeacherLayout>
 *     <ChildComponent />
 *   </TeacherLayout>
 * )
 */

// Mock notifications data for development
const MOCK_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'New assignment submission',
    message: 'Emily Johnson submitted the Algebra Quiz',
    time: '10 minutes ago',
    read: false,
    type: 'submission'
  },
  {
    id: 'notif-2',
    title: 'New message',
    message: 'You have a new message from Principal Roberts',
    time: '1 hour ago',
    read: false,
    type: 'message'
  },
  {
    id: 'notif-3',
    title: 'Schedule update',
    message: 'Your Physics class has been rescheduled to 2:00 PM tomorrow',
    time: '3 hours ago',
    read: true,
    type: 'schedule'
  },
  {
    id: 'notif-4',
    title: 'Grade reminder',
    message: 'Grades for Computer Science assignment are due by Friday',
    time: '1 day ago',
    read: true,
    type: 'reminder'
  }
];

/**
 * TeacherLayout Component
 * 
 * Manages the layout for all teacher portal pages including:
 * - Responsive sidebar navigation
 * - Notifications dropdown
 * - User profile access
 * - Content area with route outlet
 * 
 * @returns {JSX.Element} The Teacher Portal layout component
 */
const TeacherLayout = () => {
  // Auth and navigation hooks
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // UI state management
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null); // Reference for clicking outside detection

  /**
   * Toggle sidebar visibility, primarily for mobile view
   * 
   * @returns {void}
   */
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  /**
   * Handle user logout
   * Calls auth context logout function and redirects to login page
   * 
   * @async
   * @returns {Promise<void>}
   */
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Navigation links configuration
  const navigation = [
    { name: 'Dashboard', path: '/teacher', icon: 'home' },
    { name: 'My Classes', path: '/teacher/classes', icon: 'book' },
    { name: 'Attendance', path: '/teacher/attendance', icon: 'calendar' },
    { name: 'Assignments', path: '/teacher/assignments', icon: 'clipboard' },
    { name: 'Grades', path: '/teacher/grades', icon: 'star' },
    { name: 'Resources', path: '/teacher/resources', icon: 'folder' },
    { name: 'Messages', path: '/teacher/messages', icon: 'mail' },
    { name: 'Profile', path: '/teacher/profile', icon: 'user' }
  ];

  // Determine current page for header title display
  const currentPage = navigation.find(nav => 
    location.pathname === nav.path || location.pathname.startsWith(`${nav.path}/`)
  );
  
  const pageTitle = currentPage ? currentPage.name : 'Teacher Portal';

  /**
   * Toggle notifications dropdown visibility
   * 
   * @returns {void}
   */
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  /**
   * Mark a specific notification as read
   * 
   * @param {string} id - The notification ID to mark as read
   * @returns {void}
   */
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  /**
   * Mark all notifications as read
   * 
   * @returns {void}
   */
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  // Calculate unread notification count for badge display
  const unreadCount = notifications.filter(notif => !notif.read).length;

  /**
   * Get appropriate icon based on notification type
   * 
   * @param {string} type - The notification type ('submission', 'message', 'schedule', 'reminder')
   * @returns {JSX.Element} The icon component for the specified notification type
   */
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'submission':
        return (
          <div className="rounded-full bg-blue-100 p-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'message':
        return (
          <div className="rounded-full bg-green-100 p-2">
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        );
      case 'schedule':
        return (
          <div className="rounded-full bg-purple-100 p-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case 'reminder':
        return (
          <div className="rounded-full bg-yellow-100 p-2">
            <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="rounded-full bg-gray-100 p-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  /**
   * Effect hook to handle clicking outside of notifications dropdown
   * Closes the notification dropdown when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <div 
        className={`bg-blue-800 text-white fixed md:relative inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-16'
        }`}
      >
        {/* Logo / Brand */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-blue-700">
          {isSidebarOpen ? (
            <div className="text-xl font-bold">Teacher Portal</div>
          ) : (
            <div className="text-center w-full">
              <span className="font-bold text-lg">TP</span>
            </div>
          )}
          <button 
            onClick={toggleSidebar}
            className="text-white p-1 rounded-full hover:bg-blue-700 md:hidden"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-5 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path || 
                            location.pathname.startsWith(`${item.path}/`);
            
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`
                  flex items-center px-2 py-3 text-sm font-medium rounded-md
                  ${isActive 
                    ? 'bg-blue-900 text-white' 
                    : 'text-blue-100 hover:bg-blue-700'}
                  ${!isSidebarOpen ? 'justify-center' : ''}
                `}
              >
                <span className="mr-3 flex-shrink-0 h-6 w-6 flex items-center justify-center">
                  {item.icon === 'home' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  )}
                  {item.icon === 'book' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )}
                  {item.icon === 'calendar' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  {item.icon === 'clipboard' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  )}
                  {item.icon === 'star' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  )}
                  {item.icon === 'folder' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  )}
                  {item.icon === 'mail' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  {item.icon === 'user' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </span>
                {isSidebarOpen && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar / Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center">
              {/* Mobile menu button - only visible on small screens */}
              <button
                onClick={toggleSidebar}
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <h1 className="ml-2 text-xl font-semibold text-gray-800">{pageTitle}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications Dropdown */}
              <div className="relative" ref={notificationRef}>
                <button 
                  className="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                  onClick={toggleNotifications}
                >
                  <span className="sr-only">View notifications</span>
                  <div className="relative">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    
                    {/* Unread indicator dot */}
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                    )}
                  </div>
                </button>
                
                {/* Notifications Dropdown Panel */}
                {showNotifications && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                          {unreadCount > 0 && (
                            <button 
                              className="text-xs text-blue-600 hover:text-blue-800"
                              onClick={markAllAsRead}
                            >
                              Mark all as read
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {/* Notifications List with Scrolling */}
                      <div className="max-h-72 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="px-4 py-3 text-sm text-gray-500 text-center">
                            No notifications
                          </div>
                        ) : (
                          notifications.map(notification => (
                            <div 
                              key={notification.id} 
                              className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                              onClick={() => markAsRead(notification.id)}
                            >
                              <div className="flex items-start">
                                <div className="flex-shrink-0 mr-3">
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {notification.title}
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {notification.time}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      
                      {/* View All Link */}
                      <div className="border-t border-gray-100 px-4 py-2">
                        <button
                          className="text-xs text-blue-600 hover:text-blue-800 w-full text-center"
                          onClick={() => navigate('/teacher/messages')}
                        >
                          View all notifications
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* User Menu */}
              <div className="relative ml-3">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {/* User Avatar/Initial */}
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                      {currentUser?.name?.charAt(0) || 'T'}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:block">
                      {currentUser?.name || 'Teacher'}
                    </span>
                  </div>
                  
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                  >
                    <span className="sr-only">Logout</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content - Renders child routes */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout; 
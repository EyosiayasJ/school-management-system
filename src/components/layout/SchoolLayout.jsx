import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const SchoolLayout = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login/internal');
  };

  // List of navigation items
  const navItems = [
    { label: 'Dashboard', path: '/school', icon: 'dashboard' },
    { label: 'Students', path: '/school/students', icon: 'school' },
    { label: 'Teachers', path: '/school/teachers', icon: 'person' },
    { label: 'Health Records', path: '/school/health-records', icon: 'healing' },
    { label: 'E-Library', path: '/school/e-library', icon: 'menu_book' },
    { label: 'Events', path: '/school/events', icon: 'event' },
    { label: 'Branches', path: '/school/branches', icon: 'business' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-blue-800 text-white">
        <div className="p-4 h-16 flex items-center border-b border-blue-700">
          <span className="text-xl font-bold">School Portal</span>
        </div>
        <div className="overflow-y-auto flex-1 py-4">
          <ul className="space-y-2 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-700 ${
                    location.pathname === item.path || (item.path !== '/school' && location.pathname.startsWith(item.path))
                      ? 'bg-blue-700'
                      : ''
                  }`}
                >
                  <span className="material-icons">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 border-t border-blue-700">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center mr-3">
              <span className="text-lg font-bold">{currentUser?.name?.charAt(0) || 'U'}</span>
            </div>
            <div>
              <p className="font-semibold truncate">{currentUser?.name}</p>
              <p className="text-xs text-blue-300">{currentUser?.role?.replace('_', ' ')}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-600"
          >
            <span className="material-icons">logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Menu */}
      <div className="md:hidden bg-blue-800 text-white w-full h-16 fixed top-0 left-0 z-20 flex items-center justify-between px-4">
        <span className="text-xl font-bold">School Portal</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
          <span className="material-icons">{isMobileMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full h-screen bg-blue-800 z-10 animate-fade-in-down">
          <ul className="p-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-700 ${
                    location.pathname === item.path || (item.path !== '/school' && location.pathname.startsWith(item.path))
                      ? 'bg-blue-700'
                      : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="material-icons">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-blue-700 mt-4 pt-4">
              <div className="flex items-center px-4 py-2">
                <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center mr-3">
                  <span className="text-lg font-bold">{currentUser?.name?.charAt(0) || 'U'}</span>
                </div>
                <div>
                  <p className="font-semibold">{currentUser?.name}</p>
                  <p className="text-xs text-blue-300">{currentUser?.role?.replace('_', ' ')}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-4 py-3 mt-2 bg-blue-700 rounded-lg hover:bg-blue-600"
              >
                <span className="material-icons">logout</span>
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 mt-16 md:mt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SchoolLayout; 
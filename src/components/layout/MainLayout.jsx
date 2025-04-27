import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => setExpanded(!expanded);

  // Collapse sidebar automatically if screen small
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar expanded={expanded} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${expanded ? 'pl-64' : 'pl-20'}`}>
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

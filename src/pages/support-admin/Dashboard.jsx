import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Mock data service - would be replaced with actual API calls
const fetchSupportDashboardData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        pendingSchools: 5,
        pendingBranches: 12,
        activeTickets: 8,
        schoolsToOnboard: [
          { id: 1, name: 'Sunshine International School', location: 'New York', status: 'pending', createdAt: '2023-06-14T10:30:00' },
          { id: 2, name: 'Evergreen Academy', location: 'Chicago', status: 'pending', createdAt: '2023-06-13T14:45:00' },
          { id: 3, name: 'Westside School', location: 'Los Angeles', status: 'pending', createdAt: '2023-06-12T09:15:00' },
        ],
        recentTickets: [
          { id: 101, title: 'Login issues for branch directors', priority: 'high', status: 'open', createdAt: '2023-06-15T08:30:00' },
          { id: 102, title: 'Student import failing', priority: 'medium', status: 'open', createdAt: '2023-06-14T11:20:00' },
          { id: 103, title: 'Calendar sync not working', priority: 'low', status: 'open', createdAt: '2023-06-13T15:45:00' },
        ],
      });
    }, 1000);
  });
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSupportDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Error loading support dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Support Admin Dashboard</h1>
        <Link 
          to="/support-admin/onboard"
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Onboard New School
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Pending Schools" 
          value={dashboardData.pendingSchools} 
          icon={<SchoolIcon />} 
          color="teal"
          link="/support-admin/schools"
        />
        <StatCard 
          title="Pending Branches" 
          value={dashboardData.pendingBranches} 
          icon={<BranchIcon />} 
          color="blue"
          link="/support-admin/branches"
        />
        <StatCard 
          title="Active Tickets" 
          value={dashboardData.activeTickets} 
          icon={<TicketIcon />} 
          color="amber"
          link="/support-admin/tickets"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schools to Onboard */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Schools to Onboard</h2>
            <Link to="/support-admin/schools" className="text-sm text-teal-600 hover:text-teal-800">View All</Link>
          </div>
          
          {dashboardData.schoolsToOnboard.length > 0 ? (
            <div className="space-y-4">
              {dashboardData.schoolsToOnboard.map((school) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No pending schools to onboard</p>
            </div>
          )}
        </div>

        {/* Recent Support Tickets */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Support Tickets</h2>
            <Link to="/support-admin/tickets" className="text-sm text-teal-600 hover:text-teal-800">View All</Link>
          </div>
          
          {dashboardData.recentTickets.length > 0 ? (
            <div className="space-y-4">
              {dashboardData.recentTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No active support tickets</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <QuickAction 
            title="Onboard School" 
            description="Start the school onboarding process"
            icon={<PlusIcon />} 
            color="teal" 
            link="/support-admin/onboard"
          />
          <QuickAction 
            title="Manage Branches" 
            description="View and manage school branches"
            icon={<BranchIcon />} 
            color="blue" 
            link="/support-admin/branches"
          />
          <QuickAction 
            title="Support Tickets" 
            description="Handle open support requests"
            icon={<TicketIcon />} 
            color="amber" 
            link="/support-admin/tickets"
          />
          <QuickAction 
            title="Knowledge Base" 
            description="Access support documentation"
            icon={<DocumentIcon />} 
            color="purple" 
            link="/support-admin/knowledge"
          />
        </div>
      </div>
    </div>
  );
};

// Component for stat cards
const StatCard = ({ title, value, icon, color, link }) => {
  const colorClasses = {
    teal: 'bg-teal-50 text-teal-700',
    blue: 'bg-blue-50 text-blue-700',
    amber: 'bg-amber-50 text-amber-700',
    purple: 'bg-purple-50 text-purple-700',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <Link to={link} className="block h-full">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            {icon}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Component for school cards
const SchoolCard = ({ school }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{school.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{school.location}</p>
          <p className="text-xs text-gray-400 mt-1">Created on {formatDate(school.createdAt)}</p>
        </div>
        <div>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
            {school.status}
          </span>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <Link 
          to={`/support-admin/onboard?school=${school.id}`}
          className="px-3 py-1 bg-teal-600 text-white text-sm rounded hover:bg-teal-700 transition-colors"
        >
          Onboard
        </Link>
        <Link 
          to={`/support-admin/schools/${school.id}`}
          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

// Component for ticket cards
const TicketCard = ({ ticket }) => {
  const priorityClasses = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-amber-100 text-amber-800',
    low: 'bg-blue-100 text-blue-800',
  };

  const statusClasses = {
    open: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    closed: 'bg-gray-100 text-gray-800',
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">#{ticket.id}: {ticket.title}</h3>
          <p className="text-xs text-gray-400 mt-1">Created on {formatDate(ticket.createdAt)}</p>
        </div>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityClasses[ticket.priority]}`}>
            {ticket.priority}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[ticket.status]}`}>
            {ticket.status}
          </span>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Link 
          to={`/support-admin/tickets/${ticket.id}`}
          className="px-3 py-1 bg-teal-600 text-white text-sm rounded hover:bg-teal-700 transition-colors"
        >
          Handle Ticket
        </Link>
      </div>
    </div>
  );
};

// Component for quick action buttons
const QuickAction = ({ title, description, icon, color, link }) => {
  const colorClasses = {
    teal: 'bg-teal-50 text-teal-700 hover:bg-teal-100',
    blue: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
    amber: 'bg-amber-50 text-amber-700 hover:bg-amber-100',
    purple: 'bg-purple-50 text-purple-700 hover:bg-purple-100',
  };

  return (
    <Link 
      to={link} 
      className={`flex flex-col p-4 rounded-lg ${colorClasses[color]} transition-colors`}
    >
      <div className="mb-2">{icon}</div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-xs mt-1 opacity-80">{description}</p>
    </Link>
  );
};

// Icons
const SchoolIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const BranchIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const TicketIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export default Dashboard;
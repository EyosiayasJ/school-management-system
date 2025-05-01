import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import useSuperDashboard from '../../hooks/superAdmin/useSuperDashboard';

const Dashboard = () => {
  const { data: dashboardData, isLoading, error } = useSuperDashboard();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-700">
        <h3 className="font-bold">Error</h3>
        <p>Failed to load dashboard data. Please try again later.</p>
      </div>
    );
  }

  // Check if dashboardData exists and provide fallback values
  const {
    totalSchools = 0,
    totalBranches = 0,
    totalUsers = 0,
    totalStudents = 0,
    schoolsChartData = [],
    recentActivity = []
  } = dashboardData || {};

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Super Admin Dashboard</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Schools" 
          value={totalSchools} 
          icon={<SchoolIcon />} 
          previousValue={totalSchools > 0 ? totalSchools - 2 : 0}
          variant="primary"
        />
        <StatCard 
          title="Total Branches" 
          value={totalBranches} 
          icon={<BranchIcon />} 
          previousValue={totalBranches > 0 ? totalBranches - 5 : 0}
          variant="success"
        />
        <StatCard 
          title="Total Users" 
          value={totalUsers} 
          icon={<UserIcon />} 
          previousValue={totalUsers > 0 ? totalUsers - 42 : 0}
          variant="info"
        />
        <StatCard 
          title="Active Students" 
          value={totalStudents} 
          icon={<StudentIcon />} 
          previousValue={totalStudents > 0 ? totalStudents - 156 : 0}
          variant="warning"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <Card title="Schools Growth" className="lg:col-span-2">
          <div className="h-64 flex items-end space-x-6">
            {(schoolsChartData || []).map((item, index) => (
              <div key={item?.month || index} className="flex flex-col items-center flex-1">
                <div className="w-full bg-blue-100 rounded-t-lg relative overflow-hidden">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all duration-1000"
                    style={{ height: `${((item?.count || 0) / 30) * 100}%`, minHeight: '10%' }}
                  />
                </div>
                <div className="text-xs font-medium text-gray-500 mt-2">{item?.month || '-'}</div>
                <div className="text-sm font-semibold">{item?.count || 0}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card 
          title="Recent Activity" 
          headerActions={
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          }
        >
          <div className="space-y-4">
            {(recentActivity || []).slice(0, 4).map((activity, index) => (
              <ActivityItem key={activity?.id || index} activity={activity || {}} />
            ))}
            {recentActivity?.length === 0 && (
              <div className="text-center text-gray-500 py-4">No recent activity</div>
            )}
          </div>
        </Card>
      </div>

      {/* Tasks and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Tasks */}
        <Card 
          title="Pending Tasks" 
          headerActions={
            <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
              3 tasks
            </span>
          }
        >
          <div className="space-y-3">
            <TaskItem 
              title="Review new school applications" 
              dueDate="Today" 
              priority="high" 
            />
            <TaskItem 
              title="Approve branch director accounts" 
              dueDate="Tomorrow" 
              priority="medium" 
            />
            <TaskItem 
              title="Update system-wide settings" 
              dueDate="Jun 20" 
              priority="low" 
            />
          </div>
        </Card>

        {/* Quick Actions */}
        <Card title="Quick Actions">
          <div className="grid grid-cols-2 gap-4">
            <QuickAction 
              title="Add School" 
              icon={<PlusIcon />} 
              color="blue" 
              link="/super-admin/schools"
            />
            <QuickAction 
              title="Add Branch" 
              icon={<PlusIcon />} 
              color="green" 
              link="/super-admin/branches"
            />
            <QuickAction 
              title="User Management" 
              icon={<UserIcon />} 
              color="purple" 
              link="/super-admin/users"
            />
            <QuickAction 
              title="System Settings" 
              icon={<SettingsIcon />} 
              color="gray" 
              link="/super-admin/settings"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

// Component for activity items
const ActivityItem = ({ activity }) => {
  const getActionColor = (action) => {
    switch (action) {
      case 'School Created':
        return 'bg-green-100 text-green-800';
      case 'Branch Added':
        return 'bg-blue-100 text-blue-800';
      case 'User Role Changed':
        return 'bg-purple-100 text-purple-800';
      case 'School Settings Updated':
        return 'bg-yellow-100 text-yellow-800';
      case 'New Support Ticket':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

      if (diffInDays === 0) {
        return 'Today';
      } else if (diffInDays === 1) {
        return 'Yesterday';
      } else if (diffInDays < 7) {
        return `${diffInDays} days ago`;
      } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="flex items-start space-x-3">
      <div className={`px-2 py-1 rounded-md text-xs font-medium ${getActionColor(activity.action || 'Unknown')}`}>
        {activity.action || 'Unknown'}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{activity.details || 'No details available'}</p>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <span>{activity.user || 'Unknown user'}</span>
          <span className="mx-1">•</span>
          <span>{formatDate(activity.timestamp)}</span>
        </div>
      </div>
    </div>
  );
};

const TaskItem = ({ title, dueDate, priority }) => {
  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <input type="checkbox" className="rounded text-blue-500 focus:ring-blue-500" />
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-500">{dueDate}</span>
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityColors[priority] || 'bg-gray-100'}`}>
          {priority}
        </span>
      </div>
    </div>
  );
};

const QuickAction = ({ title, icon, color, link }) => {
  const bgColors = {
    blue: 'bg-blue-50 hover:bg-blue-100 text-blue-700',
    green: 'bg-green-50 hover:bg-green-100 text-green-700',
    purple: 'bg-purple-50 hover:bg-purple-100 text-purple-700',
    amber: 'bg-amber-50 hover:bg-amber-100 text-amber-700',
    gray: 'bg-gray-50 hover:bg-gray-100 text-gray-700',
  };

  return (
    <Link
      to={link}
      className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${bgColors[color] || bgColors.gray}`}
    >
      <div className="mb-2">{icon}</div>
      <span className="text-sm font-medium">{title}</span>
    </Link>
  );
};

// Icon components for the dashboard
const SchoolIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const BranchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const StudentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default Dashboard;
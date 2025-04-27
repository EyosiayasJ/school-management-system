import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatCard from '../../components/dashboard/StatCard.jsx';
import ActivityItem from '../../components/dashboard/ActivityItem';
import QuickLinkButton from '../../components/dashboard/QuickLinkButton';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulated loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { name: 'Total Students', value: '2,543', change: '+12%', iconColor: 'text-blue-500' },
    { name: 'Total Teachers', value: '157', change: '+4%', iconColor: 'text-emerald-500' },
    { name: 'Total Branches', value: '12', change: '+2', iconColor: 'text-violet-500' },
    { name: 'Upcoming Events', value: '8', change: 'This week', iconColor: 'text-amber-500' },
  ];

  const activities = [
    { id: 1, user: 'John Smith', action: 'added a new student', time: '2 hours ago' },
    { id: 2, user: 'Sarah Johnson', action: 'updated health records', time: '4 hours ago' },
    { id: 3, user: 'Michael Brown', action: 'added 5 new books to E-Library', time: 'Yesterday' },
    { id: 4, user: 'Emily Davis', action: 'scheduled a new event', time: '2 days ago' },
  ];

  const quickLinks = [
    { label: 'Add Student', iconColor: 'text-blue-600' },
    { label: 'Add Teacher', iconColor: 'text-green-600' },
    { label: 'Add Event', iconColor: 'text-amber-600' },
    { label: 'Generate Report', iconColor: 'text-violet-600' },
  ];

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold text-gray-900"
        >
          Dashboard
        </motion.h1>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? [...Array(4)].map((_, index) => (
                <div key={index} className="bg-gray-100 animate-pulse h-32 rounded-lg" />
              ))
            : stats.map((stat, index) => (
                <StatCard key={index} {...stat} delay={index * 0.1} />
              ))
          }
        </div>

        {/* Branch Overview */}
        <div className="mt-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Branch Overview</h3>
              <p className="mt-1 text-sm text-gray-500">Performance metrics across all branches</p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                <p className="text-gray-500">Branch performance chart will be displayed here</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="bg-white shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
              <p className="mt-1 text-sm text-gray-500">Latest actions across the system</p>
            </div>
            <div className="divide-y divide-gray-200">
              {isLoading
                ? [...Array(3)].map((_, index) => (
                    <div key={index} className="p-4 animate-pulse bg-gray-100" />
                  ))
                : activities.map((activity) => (
                    <ActivityItem key={activity.id} {...activity} />
                  ))
              }
            </div>
          </motion.div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="bg-white shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Links</h3>
            </div>
            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {isLoading
                ? [...Array(4)].map((_, index) => (
                    <div key={index} className="h-24 bg-gray-100 animate-pulse rounded-lg" />
                  ))
                : quickLinks.map((link, index) => (
                    <QuickLinkButton key={index} {...link} />
                  ))
              }
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// src/pages/dashboard/Dashboard.jsx

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import StatCard                from '../../components/dashboard/StatCard.jsx';
import ActivityItem            from '../../components/dashboard/ActivityItem.jsx';
import QuickLinkButton         from '../../components/dashboard/QuickLinkButton.jsx';
import BranchPerformanceChart  from '../../components/dashboard/BranchPerformanceChart.jsx';

import { stats, activities, quickLinks } from '../../mock';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // route handler for quick links
  const handleClickQuickLink = (link) => {
    switch (link.label) {
      case 'Add Student':     return navigate('/students');
      case 'Add Teacher':     return navigate('/teachers');
      case 'Add Event':       return navigate('/events');
      case 'Generate Report': return alert('Generate Report clicked');
      default: console.warn('Unhandled Quick Link', link.label);
    }
  };

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

        {/* --- Stats --- */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? [...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-100 animate-pulse h-32 rounded-lg" />
              ))
            : stats.map((stat, i) => (
                <StatCard key={i} {...stat} delay={i * 0.1} />
              ))
          }
        </div>

        {/* --- Branch Overview Chart --- */}
        <div className="mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Branch Overview</h3>
              <p className="mt-1 text-sm text-gray-500">
                Performance metrics across all branches
              </p>
            </div>
            <div className="p-6">
              <BranchPerformanceChart />
            </div>
          </motion.div>
        </div>

        {/* --- Recent Activity --- */}
        <div className="mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="bg-white shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              <p className="mt-1 text-sm text-gray-500">Latest actions across the system</p>
            </div>
            <div className="divide-y divide-gray-200">
              {isLoading
                ? [...Array(3)].map((_, i) => (
                    <div key={i} className="p-4 animate-pulse bg-gray-100" />
                  ))
                : activities.map((act) => (
                    <ActivityItem key={act.id} {...act} />
                  ))
              }
            </div>
          </motion.div>
        </div>

        {/* --- Quick Links --- */}
        <div className="mt-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="bg-white shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Quick Links</h3>
            </div>
            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {isLoading
                ? [...Array(4)].map((_, i) => (
                    <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-lg" />
                  ))
                : quickLinks.map((link, i) => (
                    <QuickLinkButton
                      key={i}
                      {...link}
                      onClick={() => handleClickQuickLink(link)}
                    />
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

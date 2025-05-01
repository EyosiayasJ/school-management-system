import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * SchoolDetailTabs Component
 * 
 * A tabbed interface for the SchoolDetail page that manages branches, users, and settings
 * 
 * @param {string} activeTab - The currently active tab
 * @param {function} onTabChange - Function to call when tab is changed
 * @param {React.ReactNode} branchesContent - Content to display in the branches tab
 * @param {React.ReactNode} usersContent - Content to display in the users tab
 * @param {React.ReactNode} settingsContent - Content to display in the settings tab
 * @param {boolean} isLoading - Whether the component is in loading state
 */
const SchoolDetailTabs = ({ 
  activeTab = 'branches', 
  onTabChange,
  branchesContent,
  usersContent,
  settingsContent,
  isLoading = false
}) => {
  // Tab definitions
  const tabs = [
    { id: 'branches', label: 'Branches', icon: BranchIcon },
    { id: 'users', label: 'Users', icon: UserIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];

  // Handle tab click
  const handleTabClick = (tabId) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="animate-pulse">
          <div className="border-b border-gray-200">
            <div className="flex px-6 py-4 space-x-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 bg-gray-200 rounded w-24"></div>
              ))}
            </div>
          </div>
          <div className="p-6">
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Render active content based on tab
  const renderContent = () => {
    switch (activeTab) {
      case 'branches':
        return branchesContent;
      case 'users':
        return usersContent;
      case 'settings':
        return settingsContent;
      default:
        return branchesContent;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${isActive
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <tab.icon className={`mr-2 h-5 w-5 ${isActive ? 'text-teal-500' : 'text-gray-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="p-6"
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};

// Icon components
const BranchIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const SettingsIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default SchoolDetailTabs;
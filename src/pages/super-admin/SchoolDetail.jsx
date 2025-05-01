import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Tabs from '../../components/common/Tabs';
import DataTable from '../../components/common/DataTable';
import { useSchool } from '../../hooks/superAdmin/useSchools';
import SchoolBranchesTab from '../../components/super-admin/SchoolBranchesTab';
import SchoolUsersTab from '../../components/super-admin/SchoolUsersTab';
import SchoolSettingsTab from '../../components/super-admin/SchoolSettingsTab';

const SchoolDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch school data using our hook
  const { data: school, isLoading, error } = useSchool(id);

  // Go back to schools list
  const handleBack = () => {
    navigate('/super-admin/schools');
  };

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error || !school) {
    return (
      <div className="bg-red-50 text-red-700 p-6 rounded-xl">
        <h3 className="text-lg font-bold mb-2">Error Loading School</h3>
        <p>The school with ID {id} could not be loaded. It may not exist or you don't have permission to view it.</p>
        <button 
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Back to Schools List
        </button>
      </div>
    );
  }

  // Define the tabs configuration
  const tabsConfig = [
    {
      id: 'branches',
      label: 'Branches',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      content: <SchoolBranchesTab schoolId={id} />
    },
    {
      id: 'users',
      label: 'Users',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      content: <SchoolUsersTab schoolId={id} />
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      content: <SchoolSettingsTab school={school} />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center">
        <button 
          onClick={handleBack}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{school.name}</h1>
          <p className="text-gray-600">School ID: {school.id} • Created on {formatDate(school.createdAt)}</p>
        </div>
      </div>

      {/* School Info Card */}
      <Card title="School Information">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 mb-4 md:mb-0 flex justify-center md:justify-start">
            <div className="w-32 h-32 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-bold border border-blue-200">
              {school.logo ? (
                <img 
                  src={school.logo} 
                  alt={`${school.name} logo`} 
                  className="w-32 h-32 rounded-lg object-cover"
                />
              ) : (
                school.name.charAt(0)
              )}
            </div>
          </div>
          <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{school.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{school.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{school.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Subscription</p>
              <p className="font-medium">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {school.subscription}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${school.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {school.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Edit School
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Tab Content */}
      <Tabs tabs={tabsConfig} defaultTab="branches" />
    </div>
  );
};

export default SchoolDetail;
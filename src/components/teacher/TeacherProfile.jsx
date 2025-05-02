/**
 * Teacher Profile Component
 * 
 * Displays detailed information about a teacher.
 */

import React from 'react';

const TeacherProfile = ({ teacher, onClose, onEdit }) => {
  if (!teacher) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Teacher Profile</h2>
          <button 
            className="text-gray-500 hover:text-gray-700" 
            onClick={onClose}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center mb-6">
          <img 
            src={teacher.avatar || 'https://via.placeholder.com/150'} 
            alt={teacher.name} 
            className="h-16 w-16 rounded-full mr-4" 
          />
          <div>
            <h3 className="text-lg font-medium">{teacher.name}</h3>
            <p className="text-sm text-gray-500">{teacher.subject}</p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div>
            <span className="text-sm font-medium text-gray-500">Branch:</span>
            <span className="ml-2">{teacher.branch}</span>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Status:</span>
            <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              teacher.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {teacher.status}
            </span>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => onEdit(teacher)}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
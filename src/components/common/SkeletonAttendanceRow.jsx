import React from 'react';

/**
 * Skeleton loader for attendance rows
 * Displays a loading placeholder for student attendance entries
 */
const SkeletonAttendanceRow = () => {
  return (
    <div className="p-4 hover:bg-gray-50 animate-pulse border-b border-gray-100">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full"></div>
        
        <div className="ml-4 flex-1">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
        
        <div className="flex items-center space-x-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-8 w-20 bg-gray-200 rounded-md"></div>
          ))}
          <div className="ml-2 h-8 w-8 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonAttendanceRow; 
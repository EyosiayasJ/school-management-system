import React from 'react';

function SkeletonStatCard() {
  return (
    <div className="bg-gray-100 animate-pulse rounded-lg p-6 min-h-[8rem] shadow-md flex flex-col justify-center">
      <div className="h-4 w-1/3 bg-gray-300 rounded mb-3" />
      <div className="h-8 w-1/2 bg-gray-300 rounded" />
    </div>
  );
}

export default SkeletonStatCard;
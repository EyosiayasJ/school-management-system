import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ViewBranchModal = ({ isOpen, onClose, branch }) => {
  if (!isOpen || !branch) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg w-full max-w-2xl h-[80vh] overflow-hidden relative"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
          >
            <button
              className="absolute top-3 right-3 p-1 rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              aria-label="Close"
              onClick={onClose}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Header */}
            <div className="bg-blue-600 text-white p-6 flex items-center">
              <div className="bg-white rounded-full w-20 h-20 flex justify-center items-center border-2 border-blue-200">
                <svg className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold">{branch.name}</h2>
                <p className="text-blue-100">{branch.location}</p>
                <div className="flex mt-2 space-x-2">
                  <StatusBadge status={branch.status} />
                </div>
              </div>
            </div>
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  className="py-4 px-6 text-sm font-medium border-b-2 border-blue-500 text-blue-600"
                  style={{ cursor: 'default' }}
                >
                  Information
                </button>
              </nav>
            </div>
            {/* Content */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 200px)' }}>
              <div className="space-y-4">
                <InfoItem label="Established" value={branch.establishedYear} />
                <InfoItem label="Students" value={branch.students} />
                <InfoItem label="Teachers" value={branch.teachers} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


const InfoItem = ({ label, value }) => (
  <div>
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900">{value}</dd>
  </div>
);

const StatusBadge = ({ status }) => {
  let bgColor = 'bg-green-100';
  let textColor = 'text-green-800';
  if (status === 'inactive') {
    bgColor = 'bg-gray-100';
    textColor = 'text-gray-800';
  } else if (status === 'suspended') {
    bgColor = 'bg-orange-100';
    textColor = 'text-orange-800';
  } else if (status === 'blacklisted' || status === 'expelled') {
    bgColor = 'bg-red-100';
    textColor = 'text-red-800';
  }
  return (
    <span className={`px-2 py-1 rounded-full text-xs ${bgColor} ${textColor} capitalize`}>
      {status}
    </span>
  );
};

export default ViewBranchModal;

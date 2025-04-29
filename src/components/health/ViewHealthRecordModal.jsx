import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ViewHealthRecordModal = ({ isOpen, onClose, record }) => {
  if (!isOpen || !record) return null;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          aria-labelledby="health-record-modal-title"
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden relative"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
          >
            <button
              className="absolute top-3 right-3 p-1 rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              aria-label="Close modal"
              onClick={onClose}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Header */}
            <div className="bg-blue-600 text-white p-6 flex items-center">
              <div className="bg-white rounded-full w-16 h-16 flex justify-center items-center border-2 border-blue-200 overflow-hidden">
                <img 
                  src={record.avatar} 
                  alt="" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold" id="health-record-modal-title">{record.studentName}</h2>
                <p className="text-blue-100">{record.branch}</p>
                <div className="flex mt-2 space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${record.status === 'complete' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} capitalize`}
                  >
                    {record.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto">
              <dl className="space-y-4">
                <InfoItem label="Record Type" value={record.recordType} />
                <InfoItem label="Date" value={formatDate(record.date)} />
              </dl>
            </div>
            
            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
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

export default ViewHealthRecordModal;
/**
 * Add Teacher Modal Component
 * 
 * Modal dialog for creating new teacher records.
 */

import React, { useState } from 'react';

const AddTeacherModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    branch: 'Main Campus',
    status: 'active'
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add New Teacher</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter teacher name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded"
            onClick={() => onSubmit(formData)}
          >
            Add Teacher
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTeacherModal; 
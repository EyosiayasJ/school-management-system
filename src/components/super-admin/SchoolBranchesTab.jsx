import { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import DataTable from '../common/DataTable';
import Modal from '../common/Modal';
import FormField from '../common/FormField';
import { toast } from 'react-hot-toast';
import superAdminApi from '../../services/superAdminApi';

const SchoolBranchesTab = ({ schoolId }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);

  // Fetch branches for this school
  const { 
    data: branchesData = { items: [] }, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['schoolBranches', schoolId],
    queryFn: async () => {
      const response = await superAdminApi.getSchoolBranches(schoolId);
      return response.data;
    }
  });
  
  // Extract the branches array from the response
  const branches = branchesData.items || [];

  // Define columns for DataTable
  const columns = [
    {
      field: 'name',
      header: 'Branch Name',
      sortable: true
    },
    {
      field: 'address',
      header: 'Address',
      sortable: true
    },
    {
      field: 'director',
      header: 'Director',
      sortable: true
    },
    {
      field: 'students',
      header: 'Students',
      sortable: true,
      render: (row) => row.students.toLocaleString()
    },
    {
      field: 'teachers',
      header: 'Teachers',
      sortable: true,
      render: (row) => row.teachers.toLocaleString()
    }
  ];

  // Handler for adding a new branch
  const handleAddBranch = () => {
    setEditingBranch(null);
    setShowAddModal(true);
  };

  // Handler for editing a branch
  const handleEditBranch = (branch) => {
    setEditingBranch(branch);
    setShowAddModal(true);
  };

  // Handler for deleting a branch
  const handleDeleteBranch = async (id) => {
    if (window.confirm('Are you sure you want to delete this branch? This action cannot be undone.')) {
      try {
        await superAdminApi.deleteBranch(id);
        toast.success('Branch deleted successfully');
        refetch();
      } catch (error) {
        console.error('Error deleting branch:', error);
        toast.error('Failed to delete branch');
      }
    }
  };

  // Handler for saving a branch (create or update)
  const handleSaveBranch = async (formData) => {
    try {
      if (editingBranch) {
        // Update existing branch
        await superAdminApi.updateBranch(editingBranch.id, {
          ...formData,
          schoolId
        });
        toast.success('Branch updated successfully');
      } else {
        // Create new branch
        await superAdminApi.createBranch({
          ...formData,
          schoolId
        });
        toast.success('Branch added successfully');
      }
      setShowAddModal(false);
      refetch();
    } catch (error) {
      console.error('Error saving branch:', error);
      toast.error(editingBranch ? 'Failed to update branch' : 'Failed to add branch');
    }
  };

  // Render row actions (edit, delete)
  const renderRowActions = (row) => (
    <div className="flex justify-end space-x-2">
      <button 
        className="text-gray-600 hover:text-gray-900"
        onClick={(e) => {
          e.stopPropagation();
          handleEditBranch(row);
        }}
      >
        Edit
      </button>
      <button 
        className="text-red-600 hover:text-red-900"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteBranch(row.id);
        }}
      >
        Delete
      </button>
    </div>
  );

  // Branch form component
  const BranchForm = ({ branch, onSubmit, isSubmitting }) => {
    const [formData, setFormData] = useState({
      name: branch?.name || '',
      address: branch?.address || '',
      director: branch?.director || '',
      phone: branch?.phone || '',
      email: branch?.email || ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Clear error when field is edited
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: null
        }));
      }
    };

    const validate = () => {
      const newErrors = {};
      
      if (!formData.name.trim()) {
        newErrors.name = 'Branch name is required';
      }
      
      if (!formData.address.trim()) {
        newErrors.address = 'Address is required';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (validate()) {
        onSubmit(formData);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Branch Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <FormField
            label="Address"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            required
          />

          <FormField
            label="Director"
            id="director"
            name="director"
            value={formData.director}
            onChange={handleChange}
          />

          <FormField
            label="Phone"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <FormField
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={() => setShowAddModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : branch ? 'Update Branch' : 'Add Branch'}
          </button>
        </div>
      </form>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">School Branches</h2>
        <button 
          onClick={handleAddBranch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Branch
        </button>
      </div>
      
      <DataTable
        columns={columns}
        data={branches}
        loading={isLoading}
        error={error ? 'Failed to load branches. Please try again.' : null}
        onRetry={refetch}
        emptyMessage="No branches found for this school."
        renderRowActions={renderRowActions}
      />

      {/* Branch Modal (Add/Edit) */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={editingBranch ? 'Edit Branch' : 'Add New Branch'}
        size="medium"
      >
        <BranchForm 
          branch={editingBranch} 
          onSubmit={handleSaveBranch}
          isSubmitting={false}
        />
      </Modal>
    </div>
  );
};

SchoolBranchesTab.propTypes = {
  schoolId: PropTypes.string.isRequired
};

export default SchoolBranchesTab; 
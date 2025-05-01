import { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import DataTable from '../common/DataTable';
import Modal from '../common/Modal';
import FormField from '../common/FormField';
import { toast } from 'react-hot-toast';
import superAdminApi from '../../services/superAdminApi';

const SchoolUsersTab = ({ schoolId }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users for this school
  const { 
    data: usersData = { items: [] }, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['schoolUsers', schoolId],
    queryFn: async () => {
      const response = await superAdminApi.getSchoolUsers(schoolId);
      return response.data;
    }
  });

  // Fetch branches for this school (for the branch select dropdown)
  const { 
    data: branchesData = { items: [] }
  } = useQuery({
    queryKey: ['schoolBranches', schoolId],
    queryFn: async () => {
      const response = await superAdminApi.getSchoolBranches(schoolId);
      return response.data;
    }
  });
  
  // Extract the branches array from the response
  const branches = branchesData.items || [];

  // Extract the users array from the response
  const users = usersData.items || [];

  // Define columns for DataTable
  const columns = [
    {
      field: 'name',
      header: 'Name',
      sortable: true,
      render: (row) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            {row.name.charAt(0)}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{row.name}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      field: 'role',
      header: 'Role',
      sortable: true,
      render: (row) => {
        const roleMap = {
          'SCHOOL_ADMIN': 'School Admin',
          'BRANCH_DIRECTOR': 'Branch Director',
          'TEACHER': 'Teacher',
          'STAFF': 'Staff'
        };
        return roleMap[row.role] || row.role;
      }
    },
    {
      field: 'branch',
      header: 'Branch',
      sortable: true
    },
    {
      field: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${row.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {row.status}
        </span>
      )
    }
  ];

  // Handler for adding a new user
  const handleAddUser = () => {
    setEditingUser(null);
    setShowAddModal(true);
  };

  // Handler for editing a user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowAddModal(true);
  };

  // Handler for deleting a user
  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to deactivate this user? They will no longer have access to the system.')) {
      try {
        await superAdminApi.updateUser(id, { status: 'inactive' });
        toast.success('User deactivated successfully');
        refetch();
      } catch (error) {
        console.error('Error deactivating user:', error);
        toast.error('Failed to deactivate user');
      }
    }
  };

  // Handler for resetting a user's password
  const handleResetPassword = async (id) => {
    if (window.confirm('Are you sure you want to reset this user\'s password? They will receive an email with instructions.')) {
      try {
        await superAdminApi.resetUserPassword(id);
        toast.success('Password reset email sent');
      } catch (error) {
        console.error('Error resetting password:', error);
        toast.error('Failed to reset password');
      }
    }
  };

  // Handler for saving a user (create or update)
  const handleSaveUser = async (formData) => {
    try {
      if (editingUser) {
        // Update existing user
        await superAdminApi.updateUser(editingUser.id, {
          ...formData,
          schoolId
        });
        toast.success('User updated successfully');
      } else {
        // Create new user
        await superAdminApi.createUser({
          ...formData,
          schoolId
        });
        toast.success('User added successfully');
      }
      setShowAddModal(false);
      refetch();
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error(editingUser ? 'Failed to update user' : 'Failed to add user');
    }
  };

  // Render row actions (edit, delete, reset password)
  const renderRowActions = (row) => (
    <div className="flex justify-end space-x-2">
      <button 
        className="text-gray-600 hover:text-gray-900"
        onClick={(e) => {
          e.stopPropagation();
          handleEditUser(row);
        }}
      >
        Edit
      </button>
      <button 
        className="text-blue-600 hover:text-blue-900"
        onClick={(e) => {
          e.stopPropagation();
          handleResetPassword(row.id);
        }}
      >
        Reset Password
      </button>
      {row.status === 'active' && (
        <button 
          className="text-red-600 hover:text-red-900"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteUser(row.id);
          }}
        >
          Deactivate
        </button>
      )}
    </div>
  );

  // User form component
  const UserForm = ({ user, onSubmit, isSubmitting }) => {
    const [formData, setFormData] = useState({
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || 'TEACHER',
      branchId: user?.branchId || '',
      status: user?.status || 'active'
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
        newErrors.name = 'Name is required';
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Valid email is required';
      }
      
      if (!formData.role) {
        newErrors.role = 'Role is required';
      }
      
      if (!formData.branchId && formData.role !== 'SCHOOL_ADMIN') {
        newErrors.branchId = 'Branch is required for non-admin roles';
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
            label="Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <FormField
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <FormField
            label="Role"
            id="role"
            name="role"
            type="select"
            value={formData.role}
            onChange={handleChange}
            error={errors.role}
            required
          >
            <option value="SCHOOL_ADMIN">School Admin</option>
            <option value="BRANCH_DIRECTOR">Branch Director</option>
            <option value="TEACHER">Teacher</option>
            <option value="STAFF">Staff</option>
          </FormField>

          <FormField
            label="Branch"
            id="branchId"
            name="branchId"
            type="select"
            value={formData.branchId}
            onChange={handleChange}
            error={errors.branchId}
            disabled={formData.role === 'SCHOOL_ADMIN'}
          >
            <option value="">Select Branch</option>
            {branches.map(branch => (
              <option key={branch.id} value={branch.id}>{branch.name}</option>
            ))}
          </FormField>

          {user && (
            <FormField
              label="Status"
              id="status"
              name="status"
              type="select"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </FormField>
          )}
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
            {isSubmitting ? 'Saving...' : user ? 'Update User' : 'Add User'}
          </button>
        </div>
      </form>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">School Users</h2>
        <button 
          onClick={handleAddUser}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add User
        </button>
      </div>
      
      <DataTable
        columns={columns}
        data={users}
        loading={isLoading}
        error={error ? 'Failed to load users. Please try again.' : null}
        onRetry={refetch}
        emptyMessage="No users found for this school."
        renderRowActions={renderRowActions}
      />

      {/* User Modal (Add/Edit) */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={editingUser ? 'Edit User' : 'Add New User'}
        size="md"
      >
        <UserForm 
          user={editingUser} 
          onSubmit={handleSaveUser}
          isSubmitting={false}
        />
      </Modal>
    </div>
  );
};

SchoolUsersTab.propTypes = {
  schoolId: PropTypes.string.isRequired
};

export default SchoolUsersTab; 
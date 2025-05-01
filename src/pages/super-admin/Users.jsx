import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { ROLES, ROLE_GROUPS } from '../../constants/roles';

// Components
import ActionBar from '../../components/common/ActionBar';
import FormField from '../../components/common/FormField';
import DataTable from '../../components/common/DataTable';
import UserModal from '../../components/super-admin/UserModal';

// Hooks
import { useUsers, useCreateUser, useUpdateUser } from '../../hooks/superAdmin/useUsers';

// Utils
import { formatDate } from '../../utils/formatDate';

const Users = () => {
  // eslint-disable-next-line no-unused-vars
  const { currentUser } = useAuth(); // Keep for potential future use
  
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // State for modals
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch data using our hook
  const { data: users = [], isLoading, error, refetch } = useUsers();
  
  // Mutations
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  // Filter users based on search term and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.school?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Define columns for DataTable
  const columns = [
    {
      field: 'name',
      header: 'Name',
      sortable: true,
      render: (row) => (
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
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
      render: (row) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          ROLE_GROUPS.ADMIN_ROLES.includes(row.role) 
            ? 'bg-purple-100 text-purple-800' 
            : ROLE_GROUPS.STAFF_ROLES.includes(row.role) 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
        }`}>
          {row.role}
        </span>
      )
    },
    {
      field: 'school',
      header: 'School/Branch',
      sortable: true,
      render: (row) => (
        <div>
          <div className="text-sm text-gray-900">{row.school || '—'}</div>
          <div className="text-sm text-gray-500">{row.branch || '—'}</div>
        </div>
      )
    },
    {
      field: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          row.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {row.status === 'active' ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      field: 'lastLogin',
      header: 'Last Login',
      sortable: true,
      render: (row) => formatDate(row.lastLogin, 'datetime')
    }
  ];

  // Handler for adding a new user
  const handleAddUser = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  // Handler for editing a user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  // Handler for toggling user status (activate/deactivate)
  const handleToggleStatus = async (user) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    const action = newStatus === 'active' ? 'activate' : 'deactivate';
    
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      try {
        await updateUser.mutateAsync({
          id: user.id, 
          data: { ...user, status: newStatus }
        });
        toast.success(`User ${action}d successfully`);
      } catch (error) {
        console.error(`Error ${action}ing user:`, error);
        toast.error(`Failed to ${action} user`);
      }
    }
  };

  // Handler for resetting a user's password
  const handleResetPassword = async (user) => {
    if (window.confirm(`Are you sure you want to reset the password for ${user.name}? They will receive an email with instructions.`)) {
      try {
        await updateUser.mutateAsync({
          id: user.id, 
          data: { resetPassword: true }
        });
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
        await updateUser.mutateAsync({
          id: editingUser.id,
          data: formData
        });
        toast.success('User updated successfully');
      } else {
        // Create new user
        await createUser.mutateAsync(formData);
        toast.success('User added successfully');
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error(editingUser ? 'Failed to update user' : 'Failed to add user');
    }
  };

  // Render row actions (edit, reset password, activate/deactivate)
  const renderRowActions = (row) => (
    <div className="flex justify-end space-x-2">
      <button 
        className="text-blue-600 hover:text-blue-900"
        onClick={(e) => {
          e.stopPropagation();
          handleEditUser(row);
        }}
      >
        Edit
      </button>
      <button 
        className="text-gray-600 hover:text-gray-900"
        onClick={(e) => {
          e.stopPropagation();
          handleResetPassword(row);
        }}
      >
        Reset Password
      </button>
      <button 
        className={`${row.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
        onClick={(e) => {
          e.stopPropagation();
          handleToggleStatus(row);
        }}
      >
        {row.status === 'active' ? 'Deactivate' : 'Activate'}
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header with ActionBar */}
      <ActionBar
        title="User Management"
        subtitle="Manage all users across the system"
        primaryAction={{
          label: "Add User",
          onClick: handleAddUser,
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )
        }}
      />

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <FormField
              id="searchUsers"
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              inputClassName="pl-10"
              containerClassName="mb-0"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </FormField>
          </div>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
            {/* Role Filter */}
            <FormField
              id="roleFilter"
              type="select"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              containerClassName="mb-0"
            >
              <option value="all">All Roles</option>
              <option value={ROLES.SUPER_ADMIN}>Super Admin</option>
              <option value={ROLES.SUPPORT_ADMIN}>Support Admin</option>
              <option value={ROLES.BRANCH_DIRECTOR}>Branch Director</option>
              <option value={ROLES.TEACHER}>Teacher</option>
              <option value={ROLES.LIBRARIAN}>Librarian</option>
              <option value={ROLES.HEALTH_OFFICER}>Health Officer</option>
              <option value={ROLES.STUDENT}>Student</option>
              <option value={ROLES.PARENT}>Parent</option>
            </FormField>

            {/* Status Filter */}
            <FormField
              id="statusFilter"
              type="select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              containerClassName="mb-0"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </FormField>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <DataTable
        columns={columns}
        data={filteredUsers}
        loading={isLoading}
        error={error ? 'Failed to load users. Please try again.' : null}
        onRetry={refetch}
        emptyMessage="No users found matching your search criteria."
        renderRowActions={renderRowActions}
      />

      {/* User Modal (Add/Edit) */}
      <UserModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        user={editingUser}
        onSubmit={handleSaveUser}
        isSubmitting={createUser.isPending || updateUser.isPending}
      />
    </div>
  );
};

export default Users;